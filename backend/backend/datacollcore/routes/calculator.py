import json
from pathlib import Path
import logging
from functools import lru_cache

logger = logging.getLogger(__name__)

class PriceCalculator:
    """Калькулятор цен для услуг VelesIT"""
    
    @classmethod
    @lru_cache(maxsize=1)
    def _load_services(cls):
        """Загружает и кэширует данные услуг из JSON"""
        try:
            file_path = Path(__file__).resolve().parent.parent / "core" / "data" / "services.json"
            with open(file_path, encoding='utf-8') as f:
                return json.load(f)
        except FileNotFoundError:
            logger.error("Файл services.json не найден")
            raise
        except json.JSONDecodeError:
            logger.error("Ошибка формата JSON в файле услуг")
            raise

    @classmethod
    def get_services(cls):
        """Возвращает полный список услуг"""
        return cls._load_services()

    @classmethod
    def calculate(cls, service: str, subcategory: str, options: list = None):
        """
        Расчет стоимости с учетом опций
        Args:
            service: Название услуги (например "Веб-разработка")
            subcategory: Подкатегория (например "Лендинги: Одностраничные сайты")
            options: Список выбранных опций
        Returns:
            dict: {"price": int, "currency": "RUB", "base_price": int}
        """
        options = options or []
        services = cls._load_services()
        
        for item in services:
            if item["Услуга"] == service and item["Подкатегория"] == subcategory:
                base_price = item["Базовая цена"]
                total = base_price
                
                for option in options:
                    total += item["Дополнительные опции"].get(option, 0)
                
                return {
                    "price": total,
                    "currency": "RUB",
                    "base_price": base_price,
                    "options_applied": options
                }
        
        raise ValueError(f"Услуга '{service} > {subcategory}' не найдена")