from rest_framework import serializers
from .models import AbacusLog

class AbacusLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AbacusLog
        fields = ['id', 'task', 'result', 'created_at']
        read_only_fields = ['created_at']