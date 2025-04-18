from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html, mark_safe
from django.urls import reverse, path
from django.http import HttpResponse
from .models import TrelloBoard, AbacusLog
import requests
import csv
import openpyxl
from io import BytesIO
import json

# Константы Trello API
TRELLO_API_KEY = "ea5b03ece4ac7fa0b2e979d6a474a9fa"
TRELLO_API_TOKEN = "ATTAcafce86412b8b74e0e2f61adf06fe674bbc60af332ae90a81300a71d4443b44949004115"
TRELLO_BOARD_ID = "cnjWPZl4"

@admin.register(TrelloBoard)
class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ("name", "board_id", "get_preview_iframe", "get_trello_actions", 
                   "get_sync_status", "card_count", "list_count", "last_sync", "is_active")
    search_fields = ("name", "board_id", "description")
    list_filter = ("is_active", "last_sync")
    actions = ["sync_with_trello", "export_to_csv", "export_to_excel", 
              "activate_boards", "deactivate_boards"]
    readonly_fields = ("board_id", "last_sync", "get_trello_actions", "get_preview_iframe",
                      "get_sync_status", "card_count", "list_count", "member_count", "get_raw_data_view")
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
            'fields': ('get_preview_iframe', 'get_trello_actions', 'get_sync_status'),
        }),
        ('Raw Data', {
            'fields': ('get_raw_data_view',),
            'classes': ('collapse',)
        }),
    )

    class Media:
        css = {
            'all': (
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                'admin/css/trello_admin.css',
            )
        }
        js = (
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
            'admin/js/trello_admin.js',
        )

    def get_preview_iframe(self, obj):
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
    get_preview_iframe.short_description = "Предпросмотр"

    def get_trello_actions(self, obj):
        """Интерактивные кнопки действий"""
        buttons = [
            ("🔍 Открыть", f"https://trello.com/b/{obj.board_id}", "btn-outline-primary"),
            ("✚ Карточка", f"https://trello.com/b/{obj.board_id}/add", "btn-outline-success"),
            ("⚙️ Настройки", f"https://trello.com/b/{obj.board_id}/edit", "btn-outline-secondary"),
            ("📋 JSON", f"https://trello.com/b/{obj.board_id}.json", "btn-outline-info"),
            ("🔄 Синхр.", reverse("admin:trello_abacus_trelloboard_sync", args=[obj.id]), "btn-outline-warning"),
        ]
        
        return format_html('<div class="btn-group btn-group-sm">{}</div>', 
            " ".join(
                f'<a href="{url}" target="_blank" class="btn {cls}">{text}</a>'
                for text, url, cls in buttons
            )
        )
    get_trello_actions.short_description = "Действия"

    def get_sync_status(self, obj):
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
                
                return format_html('<span class="badge {}">Активна</span>', bg_color)
            return format_html('<span class="badge bg-danger">Ошибка: {}</span>', response.status_code)
        except Exception as e:
            return format_html('<span class="badge bg-warning text-dark">{}</span>', str(e))
    get_sync_status.short_description = "Статус"

    def get_raw_data_view(self, obj):
        if not obj.raw_data:
            return "-"
        return format_html('<pre style="max-height: 300px; overflow: auto;">{}</pre>', 
                         json.dumps(obj.raw_data, indent=2, ensure_ascii=False))
    get_raw_data_view.short_description = "Raw Data"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<path:object_id>/sync/', self.admin_site.admin_view(self.sync_board)),
            path('sync-all/', self.admin_site.admin_view(self.sync_all_boards)),
        ]
        return custom_urls + urls

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

    # Остальные методы админки...

@admin.register(AbacusLog)
class AbacusLogAdmin(admin.ModelAdmin):
    list_display = ("task", "created_at", "get_status_badge", "get_result_preview", "get_execution_time_formatted")
    search_fields = ("task", "result")
    list_filter = ("status", "created_at")
    readonly_fields = ("created_at", "task", "get_full_result", "status")
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
            "fields": ("get_full_result",),
            "classes": ("collapse",)
        }),
    )

    def get_status_badge(self, obj):
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
    get_status_badge.short_description = "Статус"

    def get_result_preview(self, obj):
        return format_html(
            '<div style="max-width: 400px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{}</div>',
            obj.result
        )
    get_result_preview.short_description = "Результат"

    def get_full_result(self, obj):
        return format_html('<pre style="max-height: 300px; overflow: auto;">{}</pre>', obj.result)
    get_full_result.short_description = "Полный результат"

    def get_execution_time_formatted(self, obj):
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
    get_execution_time_formatted.short_description = "Время выполнения"

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
                log.result[:1000],
                log.created_at.strftime("%Y-%m-%d %H:%M"),
                str(log.execution_time) if log.execution_time else ""
            ])
        return response

    # Остальные методы AbacusLogAdmin...

# Настройки админки
admin.site.site_header = "VELES-IT Admin"
admin.site.site_title = "Административная панель VELES-IT"
admin.site.index_title = "Управление проектом"
admin.site.empty_value_display = "-пусто-"