from django.apps import AppConfig

class TrelloAbacusConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trello_abacus'
    
    def ready(self):
        # Убедитесь, что здесь нет кода, обращающегося к моделям
        pass