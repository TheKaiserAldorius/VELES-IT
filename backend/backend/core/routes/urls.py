from django.urls import path
from .views import create_trello_card

urlpatterns = [
    path('create-card', create_trello_card, name='create-trello-card'),
]