from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .api import TrelloManager, AbacusManager
from .models import AbacusLog
from .serializers import AbacusLogSerializer  # Добавим сериализатор
import logging

logger = logging.getLogger(__name__)

class TrelloListsView(APIView):
    """
    API для получения списков Trello
    GET /api/trello/lists/
    """
    def get(self, request):
        try:
            lists = TrelloManager().get_lists()
            return Response({"lists": lists}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Ошибка получения списков Trello: {str(e)}")
            return Response(
                {"error": "Не удалось получить списки Trello"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class TrelloCardsView(APIView):
    """
    API для получения карточек Trello по ID списка
    GET /api/trello/lists/<list_id>/cards/
    """
    def get(self, request, list_id):
        try:
            cards = TrelloManager().get_cards(list_id)
            return Response({"cards": cards}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Ошибка получения карточек Trello: {str(e)}")
            return Response(
                {"error": "Не удалось получить карточки"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AbacusDecompositionView(APIView):
    """
    API для декомпозиции задач через Abacus
    POST /api/trello/decompose/
    """
    def post(self, request):
        task_name = request.data.get("task_name")
        if not task_name:
            return Response(
                {"error": "Не указано название задачи"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            decomposition = AbacusManager.decompose_task(task_name)
            
            # Логируем запрос
            log_entry = AbacusLog.objects.create(
                task=task_name,
                result=decomposition or "Ошибка декомпозиции"
            )
            
            return Response({
                "decomposition": decomposition,
                "log_id": log_entry.id
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Ошибка декомпозиции задачи: {str(e)}")
            return Response(
                {"error": "Ошибка при декомпозиции задачи"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class AbacusLogsView(APIView):
    """
    API для просмотра логов Abacus
    GET /api/trello/logs/
    """
    def get(self, request):
        logs = AbacusLog.objects.all().order_by('-created_at')[:50]  # Последние 50 записей
        serializer = AbacusLogSerializer(logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)