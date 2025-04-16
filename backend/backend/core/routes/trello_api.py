import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class TrelloAPI:
    @staticmethod
    def create_card(name, phone, service="", comment=""):
        """Создает карточку в Trello"""
        try:
            # 1. Получаем ID списка
            list_url = f"https://api.trello.com/1/boards/{settings.TRELLO_BOARD_ID}/lists"
            response = requests.get(
                list_url,
                params={
                    "key": settings.TRELLO_API_KEY,
                    "token": settings.TRELLO_TOKEN
                },
                timeout=10
            )
            response.raise_for_status()
            
            target_list = next(
                (lst for lst in response.json() 
                 if lst["name"].lower() == settings.TRELLO_DEFAULT_LIST.lower()),
                None
            )
            
            if not target_list:
                raise ValueError("Список для заявок не найден в Trello")

            # 2. Создаем карточку
            card_url = "https://api.trello.com/1/cards"
            card_data = {
                "key": settings.TRELLO_API_KEY,
                "token": settings.TRELLO_TOKEN,
                "idList": target_list["id"],
                "name": f"Заявка от {name}",
                "desc": f"""📞 Телефон: {phone}
                           🛠 Услуга: {service or 'не указана'}
                           📝 Комментарий: {comment or 'нет'}""",
                "pos": "top"
            }
            
            response = requests.post(card_url, params=card_data, timeout=10)
            response.raise_for_status()
            
            logger.info(f"Создана карточка в Trello для {name}")
            return True, "Карточка создана успешно"
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Ошибка Trello API: {str(e)}")
            return False, "Ошибка при создании карточки в Trello"
        except Exception as e:
            logger.error(f"Системная ошибка: {str(e)}")
            return False, f"Внутренняя ошибка: {str(e)}"