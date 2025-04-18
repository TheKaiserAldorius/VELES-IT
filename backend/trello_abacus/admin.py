from datetime import timezone, timedelta
from django.contrib import admin
from django.utils.html import format_html, mark_safe
from django.urls import reverse
from django.http import HttpResponse
from .models import TrelloBoard, AbacusLog
import requests
import csv
import openpyxl
from io import BytesIO

# Актуальные Данные трелло от Саши
TRELLO_API_KEY = "ea5b03ece4ac7fa0b2e979d6a474a9fa"
TRELLO_API_TOKEN = "ATTAcafce86412b8b74e0e2f61adf06fe674bbc60af332ae90a81300a71d4443b44949004115"
TRELLO_BOARD_ID = "cnjWPZl4"

class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ("name", "board_id", "preview_iframe", "trello_actions", "sync_status", "last_sync")
    search_fields = ("name", "board_id")
    list_filter = ("last_sync",)
    actions = ["sync_with_trello", "export_to_csv", "export_to_excel"]
    readonly_fields = ("board_id", "last_sync", "trello_actions", "preview_iframe")
    list_per_page = 20

    class Media:
        css = {
            'all': (
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                'admin/css/trello_admin.css',
            )
        }
        js = (
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
        )

    def preview_iframe(self, obj):
        """Встроенный предпросмотр доски"""
        if not obj.board_id:
            return "-"
        return format_html(
            '<iframe src="https://trello.com/b/{}.html" width="300" height="200" '
            'style="border:none; margin:0; padding:0;"></iframe>',
            obj.board_id
        )
    preview_iframe.short_description = "Предпросмотр"

    def trello_actions(self, obj):
        """Интерактивные кнопки действий"""
        buttons = [
            ("🔍 Открыть", f"https://trello.com/b/{obj.board_id}", "btn-primary"),
            ("✚ Карточка", f"https://trello.com/b/{obj.board_id}/add", "btn-success"),
            ("⚙️ Настройки", f"https://trello.com/b/{obj.board_id}/edit", "btn-secondary"),
            ("📋 JSON", f"https://trello.com/b/{obj.board_id}.json", "btn-info"),
        ]
        
        return format_html(" ".join(
            f'<a href="{url}" target="_blank" class="btn btn-sm {cls}">{text}</a>'
            for text, url, cls in buttons
        ))
    trello_actions.short_description = "Действия"

    def sync_status(self, obj):
        """Проверка статуса через API"""
        try:
            response = requests.get(
                f"https://api.trello.com/1/boards/{obj.board_id}",
                params={"key": TRELLO_API_KEY, "token": TRELLO_API_TOKEN},
                timeout=5
            )
            
            if response.status_code == 200:
                data = response.json()
                return format_html(
                    '<span class="badge bg-success">Активна</span><br>'
                    '<small>Карточек: {}</small>',
                    data["cards"]
                )
            return format_html('<span class="badge bg-danger">Ошибка: {}</span>', response.status_code)
        except Exception as e:
            return format_html('<span class="badge bg-warning text-dark">{}</span>', str(e))
    sync_status.short_description = "Статус"

    @admin.action(description="Синхронизировать с Trello")
    def sync_with_trello(self, request, queryset):
        """Полная синхронизация данных с Trello"""
        for board in queryset:
            try:
                # Получаем данные доски через API
                response = requests.get(
                    f"https://api.trello.com/1/boards/{board.board_id}",
                    params={
                        "key": TRELLO_API_KEY,
                        "token": TRELLO_API_TOKEN,
                        "fields": "name,desc,url",
                        "lists": "open",
                        "cards": "open"
                    },
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    board.name = data.get("name", board.name)
                    # Здесь можно сохранять другие данные
                    board.last_sync = timezone.now()
                    board.save()
                    
            except Exception as e:
                self.message_user(request, f"Ошибка синхронизации доски {board}: {str(e)}", level="error")
        
        self.message_user(request, f"Синхронизировано {queryset.count()} досок")

    @admin.action(description="Экспорт в CSV")
    def export_to_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="trello_boards.csv"'
        
        writer = csv.writer(response)
        writer.writerow(["Название", "ID доски", "Последняя синхронизация", "URL"])
        
        for board in queryset:
            writer.writerow([
                board.name,
                board.board_id,
                board.last_sync.strftime("%Y-%m-%d %H:%M") if board.last_sync else "",
                f"https://trello.com/b/{board.board_id}"
            ])
        
        return response

    @admin.action(description="Экспорт в Excel")
    def export_to_excel(self, request, queryset):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Доски Trello"
        
        headers = ["Название", "ID доски", "Последняя синхронизация", "URL"]
        ws.append(headers)
        
        for board in queryset:
            ws.append([
                board.name,
                board.board_id,
                board.last_sync.strftime("%Y-%m-%d %H:%M") if board.last_sync else "",
                f"https://trello.com/b/{board.board_id}"
            ])
        
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        
        response = HttpResponse(
            buffer.getvalue(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename="trello_boards.xlsx"'
        return response

class AbacusLogAdmin(admin.ModelAdmin):
    list_display = ("task", "created_at", "result_preview", "duration")
    search_fields = ("task", "result")
    list_filter = ("created_at",)
    readonly_fields = ("created_at", "task", "full_result")
    date_hierarchy = "created_at"
    list_per_page = 50
    actions = ["export_logs_to_csv", "export_logs_to_excel"]

    fieldsets = (
        (None, {
            "fields": ("task", "created_at")
        }),
        ("Результат", {
            "fields": ("full_result",),
            "classes": ("collapse",)
        }),
    )

    def result_preview(self, obj):
        return obj.result[:100] + "..." if len(obj.result) > 100 else obj.result
    result_preview.short_description = "Результат"

    def full_result(self, obj):
        return mark_safe(f"<pre style='white-space: pre-wrap;'>{obj.result}</pre>")
    full_result.short_description = "Полный результат"

    def duration(self, obj):
        if not hasattr(obj, "created_at"):
            return "-"
        
        delta = timezone.now() - obj.created_at
        if delta.days > 30:
            return f"{delta.days//30} мес. назад"
        if delta.days > 0:
            return f"{delta.days} д. назад"
        if delta.seconds > 3600:
            return f"{delta.seconds//3600} ч. назад"
        return f"{delta.seconds//60} мин. назад"
    duration.short_description = "Когда"

    @admin.action(description="Экспорт логов в CSV")
    def export_logs_to_csv(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="abacus_logs.csv"'
        
        writer = csv.writer(response)
        writer.writerow(["Задача", "Результат", "Дата создания"])
        
        for log in queryset:
            writer.writerow([
                log.task,
                log.result[:500],  # Ограничиваем длину
                log.created_at.strftime("%Y-%m-%d %H:%M")
            ])
        
        return response

    @admin.action(description="Экспорт логов в Excel")
    def export_logs_to_excel(self, request, queryset):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Логи Abacus"
        
        headers = ["Задача", "Результат", "Дата создания"]
        ws.append(headers)
        
        for log in queryset:
            ws.append([
                log.task,
                log.result[:500],  # Ограничиваем длину
                log.created_at.strftime("%Y-%m-%d %H:%M")
            ])
        
        buffer = BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        
        response = HttpResponse(
            buffer.getvalue(),
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response['Content-Disposition'] = 'attachment; filename="abacus_logs.xlsx"'
        return response

# Регистрация с вашей реальной доской по умолчанию
try:
    # Создаем или получаем вашу доску
    board, created = TrelloBoard.objects.get_or_create(
        board_id=TRELLO_BOARD_ID,
        defaults={
            'name': 'Основная доска VELES-IT',
            'last_sync': timezone.now()
        }
    )
except Exception as e:
    print(f"Ошибка при создании доски по умолчанию: {e}")

admin.site.register(TrelloBoard, TrelloBoardAdmin)
admin.site.register(AbacusLog, AbacusLogAdmin)

# Настройки админки
admin.site.site_header = "VELES-IT Admin"
admin.site.site_title = "Административная панель VELES-IT"
admin.site.index_title = "Управление проектом"
admin.site.empty_value_display = "-пусто-"