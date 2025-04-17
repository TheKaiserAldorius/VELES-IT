from django.contrib import admin
from .models import TrelloBoard, AbacusLog
from django.utils.html import format_html
from django.urls import reverse
from django.utils.safestring import mark_safe
import requests

@admin.register(TrelloBoard)
class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ("name", "board_id", "last_sync", "trello_link", "sync_status")
    search_fields = ("name", "board_id")
    list_filter = ("last_sync",)
    actions = ["sync_with_trello"]
    readonly_fields = ("board_id", "last_sync")

    def trello_link(self, obj):
        if not obj.board_id:
            return "-"
        url = f"https://trello.com/b/{obj.board_id}"
        return format_html('<a href="{}" target="_blank">Открыть в Trello</a>', url)
    trello_link.short_description = "Ссылка"

    def sync_status(self, obj):
        try:
            response = requests.get(f"https://trello.com/b/{obj.board_id}.json")
            return "Активна" if response.status_code == 200 else "Недоступна"
        except:
            return "Ошибка проверки"
    sync_status.short_description = "Статус доски"

    @admin.action(description="Синхронизировать выбранные доски")
    def sync_with_trello(self, request, queryset):
        for board in queryset:
            # Здесь ваша логика синхронизации
            board.last_sync = timezone.now()
            board.save()
        self.message_user(request, f"Синхронизировано {queryset.count()} досок")

@admin.register(AbacusLog)
class AbacusLogAdmin(admin.ModelAdmin):
    list_display = ("task", "created_at", "result_preview", "duration")
    search_fields = ("task", "result")
    list_filter = ("created_at",)
    readonly_fields = ("created_at", "task", "full_result")
    date_hierarchy = "created_at"
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
    result_preview.short_description = "Результат (кратко)"

    def full_result(self, obj):
        return mark_safe(f"<pre>{obj.result}</pre>")
    full_result.short_description = "Полный результат"

    def duration(self, obj):
        if not hasattr(obj, "created_at"):
            return "-"
        delta = timezone.now() - obj.created_at
        if delta.days > 0:
            return f"{delta.days} д. назад"
        return f"{delta.seconds//3600} ч. назад"
    duration.short_description = "Когда"

admin.site.site_header = "VELES-IT Admin"
admin.site.site_title = "Админка VELES-IT"
admin.site.index_title = "Управление проектом"