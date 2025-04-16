import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Lead
from django.conf import settings

@csrf_exempt
def send_to_telegram(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        
        # Сохраняем в базу
        lead = Lead.objects.create(name=name, phone=phone)
        
        # Отправляем в Telegram
        message = f"Новая заявка!\nИмя: {name}\nТелефон: {phone}"
        url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
        data = {
            "chat_id": settings.TELEGRAM_CHAT_ID,
            "text": message
        }
        requests.post(url, data=data)
        
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'error'}, status=400)