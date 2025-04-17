from django.db import models

# Модель для кеширования досок Trello
class TrelloBoard(models.Model):
    board_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    last_sync = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Модель для логов Abacus
class AbacusLog(models.Model):
    task = models.CharField(max_length=255)
    result = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.task} — {self.created_at}"