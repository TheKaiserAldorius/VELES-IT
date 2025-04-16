import requests
import time

# Настройки для работы с Trello API. Не трогай, если не хочешь всё сломать!
TRELLO_API_KEY = "ea5b03ece4ac7fa0b2e979d6a474a9fa"
TRELLO_API_TOKEN = "ATTAcafce86412b8b74e0e2f61adf06fe674bbc60af332ae90a81300a71d4443b44949004115"
TRELLO_BOARD_ID = "cnjWPZl4"

# Настройки для работы с Abacus.AI API. Да, мы используем ИИ, потому что сами не хотим думать.
ABACUS_API_URL = "https://api.abacus.ai/v1/chat"
ABACUS_API_KEY = "s2_9cdacf98f9b9449d871e7cfce9eea54a"

# Получение списков с доски Trello. Надеюсь, они там вообще есть.
def get_trello_lists():
    url = f"https://api.trello.com/1/boards/{TRELLO_BOARD_ID}/lists"
    params = {
        "key": TRELLO_API_KEY,
        "token": TRELLO_API_TOKEN
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Не удалось получить списки. Код ошибки: {response.status_code}. Может, ключи перепутал?")
        return []

# Получение карточек из конкретного списка Trello. Карточки, готовьтесь, мы идём!
def get_trello_cards(list_id):
    url = f"https://api.trello.com/1/lists/{list_id}/cards"
    params = {
        "key": TRELLO_API_KEY,
        "token": TRELLO_API_TOKEN
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Ошибка при получении карточек из списка {list_id}. Код ошибки: {response.status_code}. Ну что ж, бывает.")
        return []

# Отправка задачи в Abacus.AI для получения декомпозиции. Потому что кто-то должен думать за нас.
def get_task_decomposition(task_name):
    headers = {
        "Authorization": f"Bearer {ABACUS_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "messages": [
            {"role": "system", "content": "Ты помощник, который делает декомпозицию задач."},
            {"role": "user", "content": f"Сделай мне декомпозицию задачи {task_name}"}
        ]
    }
    response = requests.post(ABACUS_API_URL, json=data, headers=headers)
    if response.status_code == 200:
        return response.json().get("choices", [{}])[0].get("message", {}).get("content", "")
    else:
        print(f"Не удалось получить декомпозицию задачи. Код ошибки: {response.status_code}. Видимо, ИИ тоже устал.")
        return "Ошибка при получении декомпозиции."

# Обновление описания карточки в Trello. Да, мы даже это умеем.
def update_trello_card_description(card_id, description):
    url = f"https://api.trello.com/1/cards/{card_id}"
    params = {
        "key": TRELLO_API_KEY,
        "token": TRELLO_API_TOKEN,
        "desc": description
    }
    response = requests.put(url, params=params)
    if response.status_code == 200:
        print(f"Описание карточки {card_id} успешно обновлено. Ну, хоть что-то получилось.")
    else:
        print(f"Не удалось обновить описание карточки {card_id}. Код ошибки: {response.status_code}. Может, стоит попробовать ещё раз?")

# Основной скрипт. Здесь начинается вся магия (или хаос, как повезёт).
def main():
    print("Начинаем работу с доской Trello... Надеюсь, ты настроил всё правильно.")
    lists = get_trello_lists()
    if not lists:
        print("Списков на доске не найдено. Ну что ж, на этом всё!")
        return

    print(f"Найдено {len(lists)} списков. Пора за дело!\n")
    for list_index, trello_list in enumerate(lists, start=1):
        list_name = trello_list.get("name", "Без названия")
        list_id = trello_list.get("id")
        print(f"{list_index}. Работаем со списком: {list_name}. Надеюсь, он того стоит.")

        # Получаем карточки из текущего списка
        cards = get_trello_cards(list_id)
        if not cards:
            print(f"   В списке {list_name} карточек нет. Видимо, кто-то забыл их добавить.\n")
            continue

        print(f"   В списке {list_name} найдено {len(cards)} карточек. Начинаем обработку...\n")
        for card_index, card in enumerate(cards, start=1):
            card_name = card.get("name", "Без названия")
            card_id = card.get("id")
            print(f"   {card_index}. Обрабатываем карточку: {card_name}. Ну, поехали!")

            # Получаем декомпозицию задачи
            print(f"      Отправляем запрос на декомпозицию задачи: {card_name}. Надеюсь, ИИ не подведёт.")
            decomposition = get_task_decomposition(card_name)
            print(f"      Ответ получен: {decomposition}. Ну, хоть что-то полезное.")

            # Обновляем описание карточки
            print(f"      Обновляем описание карточки в Trello... Сейчас всё будет!")
            update_trello_card_description(card_id, decomposition)
            print(f"      Карточка {card_name} успешно обновлена! Мы молодцы!\n")

            # Задержка для избежания превышения лимитов API
            time.sleep(1)

    print("Все списки и карточки обработаны. Работа завершена! Можешь выдохнуть.")

if __name__ == "__main__":
    main()