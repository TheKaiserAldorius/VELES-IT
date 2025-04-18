from django.db import models
from django.utils import timezone

class TrelloBoard(models.Model):
    board_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True)
    last_sync = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    card_count = models.PositiveIntegerField(default=0)
    list_count = models.PositiveIntegerField(default=0)
    member_count = models.PositiveIntegerField(default=0)
    raw_data = models.JSONField(blank=True, null=True)

    class Meta:
        verbose_name = "Доска Trello"
        verbose_name_plural = "Доски Trello"
        ordering = ['-last_sync']

    def __str__(self):
        return f"{self.name} ({self.board_id})"

class AbacusLog(models.Model):
    task = models.CharField(max_length=255)
    result = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    execution_time = models.DurationField(null=True, blank=True)
    status = models.CharField(max_length=20, default='success', choices=[
        ('success', 'Успешно'),
        ('error', 'Ошибка'),
        ('warning', 'Предупреждение')
    ])

    class Meta:
        verbose_name = "Лог Abacus"
        verbose_name_plural = "Логи Abacus"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.task} - {self.created_at.date()}"