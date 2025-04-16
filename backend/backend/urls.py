from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
import json
from pathlib import Path
import logging
import os

logger = logging.getLogger(__name__)

def api_welcome(request):
    return JsonResponse({
        "message": "Добро пожаловать на сайт VelesIT!",
        "status": "API работает",
        "endpoints": {
            "services": "/api/v1/services/",
            "calculator": "/api/v1/calculate/",
            "trello": "/api/trello/create-card/",
            "token": "/api/token/",
            "token_refresh": "/api/token/refresh/"
        }
    })

def load_services_data():
    """Загрузка данных из services.json"""
    try:
        base_dir = Path(__file__).resolve().parent.parent  # Получаем backend/backend/
        file_path = base_dir / "core" / "data" / "services.json"
        logger.info(f"Пытаюсь загрузить файл услуг по пути: {file_path}")
        
        with open(file_path, encoding='utf-8') as f:
            return json.load(f), None
    except FileNotFoundError:
        logger.error(f"Файл услуг не найден по пути: {file_path}")
        return None, "Файл услуг не найден"
    except Exception as e:
        logger.error(f"Ошибка загрузки услуг: {str(e)}")
        return None, str(e)

@require_http_methods(["GET", "OPTIONS"])
@csrf_exempt
def get_services(request):
    """Получение списка услуг"""
    if request.method == "OPTIONS":
        return JsonResponse({}, status=200)
    
    services, error = load_services_data()
    if error:
        return JsonResponse({"error": error}, status=404)
    return JsonResponse(services, safe=False)

@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def calculate_price(request):
    """Расчет стоимости"""
    if request.method == "OPTIONS":
        return JsonResponse({}, status=200)
    
    try:
        data = json.loads(request.body)
        services, error = load_services_data()
        if error:
            return JsonResponse({"error": error}, status=404)
        

        for service in services:
            if service["Услуга"] == data.get("service") and service["Подкатегория"] == data.get("subcategory"):
                price = service["Базовая цена"]
                for option in data.get("options", []):
                    price += service["Дополнительные опции"].get(option, 0)
                return JsonResponse({
                    "price": price,
                    "currency": "RUB",
                    "service": service["Услуга"],
                    "subcategory": service["Подкатегория"]
                })
        
        return JsonResponse({"error": "Услуга не найдена"}, status=404)
    except Exception as e:
        logger.error("Ошибка расчета: %s", str(e))
        return JsonResponse({"error": str(e)}, status=500)

try:
    from core.routes.urls import urlpatterns as core_urls
    trello_routes = path('api/trello/', include(core_urls))
except ImportError as e:
    logger.warning("Не удалось загрузить маршруты Trello: %s", str(e))
    trello_routes = path('api/trello/', lambda r: JsonResponse(
        {"error": "Trello API временно недоступно"}, status=503))

urlpatterns = [
    path('admin/', admin.site.urls),
    path('telegram/', include('telegram_form.urls')),
    path('profile/', include('user_profile.urls')),
    path('api/', api_welcome),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/services/', get_services, name='services-list'),
    path('api/v1/calculate/', calculate_price, name='calculate-price'),
    trello_routes,
]