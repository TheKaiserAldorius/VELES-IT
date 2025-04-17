from rest_framework.views import APIView
from rest_framework.response import Response
from .api import TrelloManager, AbacusManager
from .models import AbacusLog

class TrelloListsView(APIView):
    def get(self, request):
        lists = TrelloManager().get_lists()
        return Response({"lists": lists})

class TrelloCardsView(APIView):
    def get(self, request, list_id):
        cards = TrelloManager().get_cards(list_id)
        return Response({"cards": cards})

class AbacusDecompositionView(APIView):
    def post(self, request):
        task_name = request.data.get("task_name")
        decomposition = AbacusManager.decompose_task(task_name)
        
        # Логируем запрос
        AbacusLog.objects.create(
            task=task_name,
            result=decomposition or "Ошибка декомпозиции"
        )
        
        return Response({"decomposition": decomposition})