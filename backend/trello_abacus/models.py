from django.db import models
from django.conf import settings

class TrelloBoard(models.Model):
    board_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    last_sync = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name

class AbacusQuery(models.Model):
    query = models.TextField()
    response = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    execution_time = models.FloatField()
    
    def __str__(self):
        return f"Query at {self.created_at}"

class MediaFile(models.Model):
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='media/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name