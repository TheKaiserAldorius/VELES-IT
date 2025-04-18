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
    site_header = "VELES IT Administration"
    site_title = "VELES IT Admin Portal"
    index_title = "Welcome to VELES IT Admin"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('dashboard/', self.admin_view(self.dashboard_view), name='dashboard'),
            path('trello-sync/', self.admin_view(self.trello_sync_view), name='trello-sync'),
            path('abacus-query/', self.admin_view(self.abacus_query_view), name='abacus-query'),
            path('media-player/', self.admin_view(self.media_player_view), name='media-player'),
        ]
        return custom_urls + urls

    def dashboard_view(self, request):
        # Используем get_or_create для безопасного получения статистики
        context = {
            **self.each_context(request),
            'stats': {
                'trello_boards': TrelloBoard.objects.count(),
                'abacus_queries': AbacusQuery.objects.count(),
                'media_files': MediaFile.objects.count(),
            },
        }
        return render(request, 'admin/dashboard.html', context)

    def trello_sync_view(self, request):
        if request.method == 'POST':
            try:
                # Логика синхронизации с Trello API
                url = f"https://api.trello.com/1/boards/{settings.TRELLO_BOARD_ID}"
                params = {
                    'key': settings.TRELLO_API_KEY,
                    'token': settings.TRELLO_API_TOKEN,
                    'cards': 'all',
                    'lists': 'all'
                }
                response = requests.get(url, params=params)
                data = response.json()
                
                # Безопасное создание/обновление доски
                board, created = TrelloBoard.objects.get_or_create(
                    board_id=settings.TRELLO_BOARD_ID,
                    defaults={
                        'name': data.get('name', 'Trello Board'),
                        'description': data.get('desc', ''),
                        'is_active': True
                    }
                )
                
                if not created:
                    board.name = data.get('name', board.name)
                    board.description = data.get('desc', board.description)
                
                board.last_sync = timezone.now()
                board.save()
                
                messages.success(request, f"Доска '{board.name}' успешно синхронизирована")
            except Exception as e:
                messages.error(request, f"Ошибка синхронизации: {str(e)}")
            return redirect('..')
        
        context = {
            **self.each_context(request),
            'trello_board_id': settings.TRELLO_BOARD_ID,
        }
        return render(request, 'admin/trello_sync.html', context)

    def abacus_query_view(self, request):
        if request.method == 'POST':
            prompt = request.POST.get('prompt', '')
            try:
                start_time = timezone.now()
                headers = {
                    "Authorization": f"Bearer {settings.ABACUS_API_KEY}",
                    "Content-Type": "application/json"
                }
                data = {
                    "prompt": prompt,
                    "model": "gpt-4"
                }
                response = requests.post(settings.ABACUS_API_URL, headers=headers, json=data)
                result = response.json()
                
                execution_time = (timezone.now() - start_time).total_seconds()
                AbacusQuery.objects.create(
                    query=prompt,
                    response=result,
                    execution_time=execution_time
                )
                
                return JsonResponse({'status': 'success', 'response': result})
            except Exception as e:
                return JsonResponse({'status': 'error', 'message': str(e)})
        
        context = {
            **self.each_context(request),
            'recent_queries': AbacusQuery.objects.order_by('-created_at')[:10],
        }
        return render(request, 'admin/abacus_query.html', context)

    def media_player_view(self, request):
        context = {
            **self.each_context(request),
            'media_files': MediaFile.objects.all(),
        }
        return render(request, 'admin/media_player.html', context)

# Регистрация кастомной админки
admin_site = CustomAdminSite(name='myadmin')

@admin.register(TrelloBoard, site=admin_site)
class TrelloBoardAdmin(admin.ModelAdmin):
    list_display = ('name', 'board_id', 'last_sync', 'is_active')
    list_editable = ('is_active',)
    search_fields = ('name', 'board_id')
    readonly_fields = ('last_sync',)
    
    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('<path:object_id>/sync/', self.admin_site.admin_view(self.sync_board), name='trello-board-sync'),
        ]
        return custom_urls + urls
    
    def sync_board(self, request, object_id):
        board = self.get_object(request, object_id)
        if board is None:
            messages.error(request, "Доска не найдена")
            return redirect('..')
            
        try:
            url = f"https://api.trello.com/1/boards/{board.board_id}"
            params = {
                'key': settings.TRELLO_API_KEY,
                'token': settings.TRELLO_API_TOKEN,
                'cards': 'all',
                'lists': 'all'
            }
            response = requests.get(url, params=params)
            data = response.json()
            
            board.name = data.get('name', board.name)
            board.description = data.get('desc', board.description)
            board.last_sync = timezone.now()
            board.save()
            
            messages.success(request, f"Доска '{board.name}' успешно синхронизирована")
        except Exception as e:
            messages.error(request, f"Ошибка синхронизации: {str(e)}")
        return redirect('..')

@admin.register(AbacusQuery, site=admin_site)
class AbacusQueryAdmin(admin.ModelAdmin):
    list_display = ('short_query', 'created_at', 'execution_time_ms')
    list_filter = ('created_at',)
    search_fields = ('query',)
    readonly_fields = ('response_preview', 'full_result')
    
    def short_query(self, obj):
        return obj.query[:50] + '...' if len(obj.query) > 50 else obj.query
    short_query.short_description = 'Query'
    
    def execution_time_ms(self, obj):
        return f"{obj.execution_time * 1000:.2f} ms"
    execution_time_ms.short_description = 'Time'
    
    def response_preview(self, obj):
        return json.dumps(obj.response, indent=2, ensure_ascii=False)
    response_preview.short_description = 'Response Preview'
    
    def full_result(self, obj):
        return json.dumps(obj.response, indent=2, ensure_ascii=False)
    full_result.short_description = 'Full Response'

@admin.register(MediaFile, site=admin_site)
class MediaFileAdmin(admin.ModelAdmin):
    list_display = ('name', 'file_player', 'uploaded_at')
    list_filter = ('uploaded_at',)
    search_fields = ('name',)
    
    def file_player(self, obj):
        if obj.file and obj.file.name.endswith(('.mp3', '.wav', '.ogg')):
            return f'<audio controls src="{obj.file.url}" style="width: 200px;"></audio>'
        return 'Unsupported format'
    file_player.allow_tags = True
    file_player.short_description = 'Player'