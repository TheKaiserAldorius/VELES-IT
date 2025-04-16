from django import forms
from django.contrib.auth.forms import UserChangeForm
from django.contrib.auth.models import User
from .models import UserProfile

class UserUpdateForm(UserChangeForm):
    password = None  # Убираем поле пароля
    
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ('avatar', 'phone', 'address')
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3}),
        }