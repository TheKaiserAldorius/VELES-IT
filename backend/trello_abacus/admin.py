# trello_integration/admin.py
from django.contrib import admin
from .models import TrelloBoard, AbacusLog

@admin.register(TrelloBoard)
class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ("name", "board_id", "last_sync")
    search_fields = ("name",)
    list_filter = ("last_sync",)

@admin.register(AbacusLog)
class AbacusLogAdmin(admin.ModelAdmin):
    list_display = ("task", "created_at")
    search_fields = ("task",)
    readonly_fields = ("created_at",)