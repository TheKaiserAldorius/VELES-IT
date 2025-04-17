import requests
from django.conf import settings
from django.core.cache import cache

class TrelloManager:
    @staticmethod
    def fetch_from_trello(endpoint, params=None):
        url = f"https://api.trello.com/1/{endpoint}"
        params = {
            **params,
            "key": settings.TRELLO_API_KEY,
            "token": settings.TRELLO_API_TOKEN
        }
        response = requests.get(url, params=params)
        return response.json() if response.status_code == 200 else None

    def get_lists(self):
        cached_lists = cache.get("trello_lists")
        if not cached_lists:
            cached_lists = self.fetch_from_trello(f"boards/{settings.TRELLO_BOARD_ID}/lists")
            cache.set("trello_lists", cached_lists, 300)  # Кеш на 5 минут
        return cached_lists

    def get_cards(self, list_id):
        return self.fetch_from_trello(f"lists/{list_id}/cards")

class AbacusManager:
    @staticmethod
    def decompose_task(task_name):
        try:
            response = requests.post(
                settings.ABACUS_API_URL,
                headers={"Authorization": f"Bearer {settings.ABACUS_API_KEY}"},
                json={
                    "messages": [
                        {"role": "system", "content": "Декомпозируй задачу"},
                        {"role": "user", "content": task_name}
                    ]
                }
            )
            return response.json()["choices"][0]["message"]["content"]
        except Exception as e:
            print(f"Ошибка Abacus: {e}")
            return None