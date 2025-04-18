from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('lists/', views.TrelloListsView.as_view(), name='trello-lists'),
    path('lists/<str:list_id>/cards/', views.TrelloCardsView.as_view(), name='trello-cards'),
    path('decompose/', views.AbacusDecompositionView.as_view(), name='abacus-decompose'),
    path('logs/', views.AbacusLogsView.as_view(), name='abacus-logs'),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)