# backend/app/routes/views.py
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .trello_api import TrelloAPI

@csrf_exempt
@require_POST
def create_trello_card(request):
    try:
        data = json.loads(request.body)
        
        success, message = TrelloAPI.create_card(
            name=data.get('name'),
            phone=data.get('phone'),
            service=data.get('service', ''),
            comment=data.get('comment', '')
        )
        
        return JsonResponse({
            "status": "success" if success else "error",
            "message": message
        }, status=200 if success else 400)
        
    except Exception as e:
        return JsonResponse({
            "status": "error",
            "message": f"Ошибка сервера: {str(e)}"
        }, status=500)