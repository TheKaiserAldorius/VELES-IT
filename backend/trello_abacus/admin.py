from django.db import models
from django.utils import timezone
from django.contrib import admin
from django.utils.html import format_html, mark_safe
from django.urls import reverse
from django.http import HttpResponse
import requests
import csv
import openpyxl
from io import BytesIO
import json

# Модель для кеширования досок Trello
class TrelloBoard(models.Model):
    board_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True)
    last_sync = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    card_count = models.PositiveIntegerField(default=0)
    list_count = models.PositiveIntegerField(default=0)
    member_count = models.PositiveIntegerField(default=0)
    raw_data = models.JSONField(blank=True, null=True)

    class Meta:
        verbose_name = "Доска Trello"
        verbose_name_plural = "Доски Trello"
        ordering = ['-last_sync']

    def __str__(self):
        return f"{self.name} ({self.board_id})"

# Модель для логов Abacus
class AbacusLog(models.Model):
    task = models.CharField(max_length=255)
    result = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    execution_time = models.DurationField(null=True, blank=True)
    status = models.CharField(max_length=20, default='success', choices=[
        ('success', 'Успешно'),
        ('error', 'Ошибка'),
        ('warning', 'Предупреждение')
    ])

    class Meta:
        verbose_name = "Лог Abacus"
        verbose_name_plural = "Логи Abacus"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.task} - {self.created_at.date()}"

# Актуальные Данные трелло
TRELLO_API_KEY = "ea5b03ece4ac7fa0b2e979d6a474a9fa"
TRELLO_API_TOKEN = "ATTAcafce86412b8b74e0e2f61adf06fe674bbc60af332ae90a81300a71d4443b44949004115"
TRELLO_BOARD_ID = "cnjWPZl4"

class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ("name", "board_id", "preview_iframe", "trello_actions", "sync_status", 
                   "card_count", "list_count", "last_sync", "is_active")
    search_fields = ("name", "board_id", "description")
    list_filter = ("is_active", "last_sync")
    actions = ["sync_with_trello", "export_to_csv", "export_to_excel", "activate_boards", "deactivate_boards"]
    readonly_fields = ("board_id", "last_sync", "trello_actions", "preview_iframe", 
                      "sync_status", "card_count", "list_count", "member_count", "raw_data_view")
    list_per_page = 20
    save_on_top = True
    fieldsets = (
        (None, {
            'fields': ('name', 'board_id', 'is_active')
        }),
        ('Дополнительная информация', {
            'fields': ('description', 'url', 'last_sync'),
            'classes': ('collapse',)
        }),
        ('Статистика', {
            'fields': ('card_count', 'list_count', 'member_count'),
            'classes': ('collapse',)
        }),
        ('Предпросмотр', {
            'fields': ('preview_iframe', 'trello_actions', 'sync_status'),
        }),
        ('Raw Data', {
            'fields': ('raw_data_view',),
            'classes': ('collapse',)
        }),
    )
#ебучие медиа ссылки
class Media:
    css = {
        'all': (
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
            '/static/admin/css/trello_admin.css',  # Добавлен слеш
        )
    }
    js = (
        'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
        '/static/admin/js/trello_admin.js',
    )

    def preview_iframe(self, obj):
        """Встроенный предпросмотр доски"""
        if not obj.board_id:
            return "-"
        return format_html(
            '<div class="trello-preview">'
            '<iframe src="https://trello.com/b/{}.html" width="100%" height="300" '
            'style="border:1px solid #ddd; border-radius:4px;"></iframe>'
            '<div class="mt-2">'
            '<a href="{}" target="_blank" class="btn btn-sm btn-outline-secondary">Открыть в новом окне</a>'
            '</div></div>',
            obj.board_id, f"https://trello.com/b/{obj.board_id}"
        )
    preview_iframe.short_description = "Предпросмотр"

    def trello_actions(self, obj):
        """Интерактивные кнопки действий"""
        buttons = [
            ("🔍 Открыть", f"https://trello.com/b/{obj.board_id}", "btn-outline-primary"),
            ("✚ Карточка", f"https://trello.com/b/{obj.board_id}/add", "btn-outline-success"),
            ("⚙️ Настройки", f"https://trello.com/b/{obj.board_id}/edit", "btn-outline-secondary"),
            ("📋 JSON", f"https://trello.com/b/{obj.board_id}.json", "btn-outline-info"),
            ("🔄 Синхр.", reverse("admin:sync_trello_board", args=[obj.id]), "btn-outline-warning"),
        ]
        
        return format_html('<div class="btn-group btn-group-sm">{}</div>', 
            " ".join(
                f'<a href="{url}" target="_blank" class="btn {cls}">{text}</a>'
                for text, url, cls in buttons
            )
        )
    trello_actions.short_description = "Действия"

    def sync_status(self, obj):
        """Проверка статуса через API"""
        if not obj.is_active:
            return format_html('<span class="badge bg-secondary">Неактивна</span>')
        
        try:
            response = requests.get(
                f"https://api.trello.com/1/boards/{obj.board_id}",
                params={
                    "key": TRELLO_API_KEY, 
                    "token": TRELLO_API_TOKEN,
                    "fields": "name,closed,prefs"
                },
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("closed", False):
                    return format_html('<span class="badge bg-danger">Закрыта</span>')
                
                bg_color = "bg-success"
                if data.get("prefs", {}).get("backgroundBrightness", "dark") == "dark":
                    bg_color = "bg-dark"
                
                return format_html(
                    '<span class="badge {}">Активна</span>',
                    bg_color
                )
            return format_html('<span class="badge bg-danger">Ошибка: {}</span>', response.status_code)
        except Exception as e:
            return format_html('<span class="badge bg-warning text-dark">{}</span>', str(e))
    sync_status.short_description = "Статус"

    def raw_data_view(self, obj):
        if not obj.raw_data:
            return "-"
        return format_html('<pre style="max-height: 300px; overflow: auto;">{}</pre>', 
                         json.dumps(obj.raw_data, indent=2, ensure_ascii=False))
    raw_data_view.short_description = "Raw Data"

    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path('<path:object_id>/sync/',
                 self.admin_site.admin_view(self.sync_board)),
            path('sync-all/',
                 self.admin_site.admin_view(self.sync_all_boards)),
        ]
        return custom_urls + urls

    def sync_board(self, request, object_id):
        """Синхронизация одной доски"""
        from django.shortcuts import redirect
        try:
            board = TrelloBoard.objects.get(id=object_id)
            self._sync_board_data(board)
            self.message_user(request, f"Доска {board.name} успешно синхронизирована")
        except Exception as e:
            self.message_user(request, f"Ошибка синхронизации: {str(e)}", level="error")
        return redirect(reverse('admin:app_trelloboard_changelist'))

    def sync_all_boards(self, request):
        """Синхронизация всех досок"""
        from django.shortcuts import redirect
        boards = TrelloBoard.objects.filter(is_active=True)
        for board in boards:
            try:
                self._sync_board_data(board)
            except Exception as e:
                self.message_user(request, f"Ошибка синхронизации доски {board}: {str(e)}", level="error")
        
        self.message_user(request, f"Синхронизировано {boards.count()} досок")
        return redirect(reverse('admin:app_trelloboard_changelist'))

    def _sync_board_data(self, board):
        """Внутренний метод синхронизации данных доски"""
        response = requests.get(
            f"https://api.trello.com/1/boards/{board.board_id}",
            params={
                "key": TRELLO_API_KEY,
                "token": TRELLO_API_TOKEN,
                "fields": "name,desc,url,dateLastActivity,prefs",
                "lists": "open",
                "cards": "open",
                "members": "all"
            },
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            board.name = data.get("name", board.name)
            board.description = data.get("desc", "")[:1000]
            board.url = data.get("url", "")
            board.card_count = len(data.get("cards", []))
            board.list_count = len(data.get("lists", []))
            board.member_count = len(data.get("members", []))
            board.raw_data = data
            board.last_sync = timezone.now()
            board.is_active = not data.get("closed", False)
            board.save()

    @admin.action(description="Синхронизировать с Trello")
    def sync_with_trello(self, request, queryset):
        """Полная синхронизация данных с Trello"""
        for board in queryset:
            try:
                self._sync_board_data(board)
            except Exception as e:
                self.message_user(request, f"Ошибка синхронизации доски {board}: {str(e)}", level="error")
        
        self.message_user(request, f"Синхронизировано {queryset.count()} досок")

    @admin.action(description="Экспорт в CSV")
    def export_to_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv; charset=utf-8-sig')
        response['Content-Disposition'] = 'attachment; filename="trello_boards.csv"'
        
        writer = csv.writer(response)
        writer.writerow(["Название", "ID доски", "Описание", "URL", "Карточек", "Колонок", 
                        "Участников", "Последняя синхронизация", "Активна"])
        
        for board in queryset:
            writer.writerow([
                board.name,
                board.board_id,
                board.description[:500] if board.description else "",
                board.url,
                board.card_count,
                board.list_count,
                board.member_count,
                board.last_sync.strftime("%Y-%m-%d %H:%M") if board.last_sync else "",
                "Да" if board.is_active else "Нет"
            ])
        
        return response

    @admin.action(description="Экспорт в Excel")
    def export_to_excel(self, request, queryset):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Доски Trello"
        
        headers = ["Название", "ID доски", "Описание", "URL", "Карточек", "Колонок", 
                  "Участников", "Последняя синхронизация", "Активна"]
        ws.append(headers)
        
        for board in queryset:
            ws.append([
                board.name,
                board.board_id,
                board.description[:500] if board.description else "",
                board.url,
                board.card_count,
                board.list_count,
                board.member_count,
                board.last_sync.strftime("%Y-%m-%d %H:%M") if board.last_sync else "",
                "Да" if board.is_active else "Нет"
            ])
        
        # Автонастройка ширины столбцов
        for column in ws.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = (max_length + 2) * 1.2
            ws.column_dimensions[column_letter].width = adjusted_width
        
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        
        response = HttpResponse(
            buffer.getvalue(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename="trello_boards.xlsx"'
        return response

    @admin.action(description="Активировать выбранные")
    def activate_boards(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"Активировано {updated} досок")

    @admin.action(description="Деактивировать выбранные")
    def deactivate_boards(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"Деактивировано {updated} досок")

class AbacusLogAdmin(admin.ModelAdmin):
    list_display = ("task", "created_at", "status_badge", "result_preview", "execution_time_formatted")
    search_fields = ("task", "result")
    list_filter = ("status", "created_at")
    readonly_fields = ("created_at", "task", "full_result", "status")
    date_hierarchy = "created_at"
    list_per_page = 50
    actions = ["export_logs_to_csv", "export_logs_to_excel", "mark_as_success", "mark_as_error"]
    list_select_related = True
    save_on_top = True

    fieldsets = (
        (None, {
            "fields": ("task", "status", "created_at", "execution_time")
        }),
        ("Результат", {
            "fields": ("full_result",),
            "classes": ("collapse",)
        }),
    )

    def status_badge(self, obj):
        colors = {
            'success': 'bg-success',
            'error': 'bg-danger',
            'warning': 'bg-warning text-dark'
        }
        return format_html(
            '<span class="badge {}">{}</span>',
            colors.get(obj.status, 'bg-secondary'),
            obj.get_status_display()
        )
    status_badge.short_description = "Статус"
    status_badge.admin_order_field = "status"

    def result_preview(self, obj):
        return format_html(
            '<div style="max-width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{}</div>',
            obj.result
        )
    result_preview.short_description = "Результат"

    def full_result(self, obj):
        return format_html('<pre style="max-height: 300px; overflow: auto;">{}</pre>', obj.result)
    full_result.short_description = "Полный результат"

    def execution_time_formatted(self, obj):
        if not obj.execution_time:
            return "-"
        
        total_seconds = obj.execution_time.total_seconds()
        if total_seconds < 1:
            return f"{total_seconds*1000:.0f} мс"
        if total_seconds < 60:
            return f"{total_seconds:.2f} сек"
        if total_seconds < 3600:
            return f"{total_seconds/60:.1f} мин"
        return f"{total_seconds/3600:.1f} ч"
    execution_time_formatted.short_description = "Время выполнения"
    execution_time_formatted.admin_order_field = "execution_time"

    @admin.action(description="Экспорт логов в CSV")
    def export_logs_to_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv; charset=utf-8-sig')
        response['Content-Disposition'] = 'attachment; filename="abacus_logs.csv"'
        
        writer = csv.writer(response)
        writer.writerow(["Задача", "Статус", "Результат", "Дата создания", "Время выполнения"])
        
        for log in queryset:
            writer.writerow([
                log.task,
                log.get_status_display(),
                log.result[:1000],  # Ограничиваем длину
                log.created_at.strftime("%Y-%m-%d %H:%M"),
                str(log.execution_time) if log.execution_time else ""
            ])
        
        return response

    @admin.action(description="Экспорт логов в Excel")
    def export_logs_to_excel(self, request, queryset):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Логи Abacus"
        
        headers = ["Задача", "Статус", "Результат", "Дата создания", "Время выполнения"]
        ws.append(headers)
        
        for log in queryset:
            ws.append([
                log.task,
                log.get_status_display(),
                log.result[:1000],  # Ограничиваем длину
                log.created_at.strftime("%Y-%m-%d %H:%M"),
                str(log.execution_time) if log.execution_time else ""
            ])
        
        # Автонастройка ширины столбцов
        for column in ws.columns:
            max_length = 0
            column_letter = column[0].column_letter
            for cell in column:
                try:
                    if len(str(cell.value)) > max_length:
                        max_length = len(str(cell.value))
                except:
                    pass
            adjusted_width = (max_length + 2) * 1.2
            ws.column_dimensions[column_letter].width = adjusted_width
        
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        
        response = HttpResponse(
            buffer.getvalue(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename="abacus_logs.xlsx"'
        return response

    @admin.action(description="Пометить как успешные")
    def mark_as_success(self, request, queryset):
        updated = queryset.update(status='success')
        self.message_user(request, f"Обновлено {updated} логов")

    @admin.action(description="Пометить как ошибки")
    def mark_as_error(self, request, queryset):
        updated = queryset.update(status='error')
        self.message_user(request, f"Обновлено {updated} логов")

# Регистрация real доски в треллалала
from django.apps import AppConfig

class TrelloAbacusConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trello_abacus'
    
    def ready(self):
        from .models import TrelloBoard
        try:
            board, created = TrelloBoard.objects.get_or_create(
                board_id=TRELLO_BOARD_ID,
                defaults={
                    'name': 'Основная доска VELES-IT',
                    'last_sync': timezone.now(),
                    'is_active': True
                }
            )
            if created:
                TrelloBoardAdmin()._sync_board_data(board)
        except Exception as e:
            print(f"Ошибка при создании доски по умолчанию: {e}")

admin.site.register(TrelloBoard, TrelloBoardAdmin)
admin.site.register(AbacusLog, AbacusLogAdmin)

# Настройки админки
admin.site.site_header = "VELES-IT Admin"
admin.site.site_title = "Административная панель VELES-IT"
admin.site.index_title = "Управление проектом"
admin.site.empty_value_display = "-пусто-"