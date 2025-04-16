from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = UserProfile
        fields = ['user', 'avatar', 'phone']
        read_only_fields = ['user']

class AvatarUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['avatar']

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, min_length=8)