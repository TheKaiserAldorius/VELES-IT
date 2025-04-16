from django.urls import path
from .views import send_to_telegram
from django.conf import settings
from django.http import JsonResponse

urlpatterns = [
    path('api/send-to-telegram/', send_to_telegram, name='send_to_telegram'),
]