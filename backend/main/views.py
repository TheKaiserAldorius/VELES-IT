from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def home(request):
    return Response({
        "message": "Добро пожаловать на сайт VelesIT!",
        "services": ["Веб-разработка", "Мобильные приложения", "Дизайн"],
        "contacts": {"email": "contact@velesit.com"}
    })