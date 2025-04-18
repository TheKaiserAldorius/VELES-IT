# trello_abacus/apps.py
from django.apps import AppConfig
from django.utils import timezone

class TrelloAbacusConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trello_abacus'
    
    def ready(self):
        from .models import TrelloBoard
        from .admin import TrelloBoardAdmin
        
        try:
            board, created = TrelloBoard.objects.get_or_create(
                board_id="cnjWPZl4",
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