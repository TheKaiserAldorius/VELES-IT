from django.contrib.auth.models import User
from django.db import models
import os

def avatar_upload_path(instance, filename):
    return f'users/{instance.user.id}/avatars/{filename}'

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to=avatar_upload_path, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"Profile of {self.user.username}"

    def save(self, *args, **kwargs):
        # Удаляем старый аватар при обновлении
        try:
            old = UserProfile.objects.get(id=self.id)
            if old.avatar != self.avatar and old.avatar:
                old.avatar.delete(save=False)
        except:
            pass
        super().save(*args, **kwargs)