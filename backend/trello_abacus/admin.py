from django.contrib import admin
from django.urls import path
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.conf import settings
from django.utils import timezone
import requests
import json
from .models import TrelloBoard, AbacusQuery, MediaFile

class CustomAdminSite(admin.AdminSite):
    site_header = "VELES IT Admin"
    site_title = "VELES IT Portal"
    index_title = "Dashboard"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(self.dashboard), name='dashboard'),
        ]
        return custom_urls + urls

    def dashboard(self, request):
        context = {
            **self.each_context(request),
            'stats': {
                'trello_boards': TrelloBoard.objects.count(),
                'abacus_queries': AbacusQuery.objects.count(),
                'media_files': MediaFile.objects.count(),
            },
        }
        return render(request, 'admin/dashboard.html', context)

admin_site = CustomAdminSite(name='myadmin')

@admin.register(TrelloBoard, site=admin_site)
class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ('name', 'board_id', 'is_active')
    readonly_fields = ('last_sync',)

    def get_urls(self):
        urls = super().get_urls()
        return urls  # Пока без кастомных URL

@admin.register(AbacusQuery, site=admin_site)
class AbacusQueryAdmin(admin.ModelAdmin):
    list_display = ('short_query', 'created_at')
    
    def short_query(self, obj):
        return obj.query[:50] + '...' if len(obj.query) > 50 else obj.query

@admin.register(MediaFile, site=admin_site)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ('name', 'uploaded_at')