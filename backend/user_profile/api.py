from rest_framework import serializers, viewsets
from rest_framework.permissions import IsAuthenticated
from .models import UserProfile

class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = UserProfile
        fields = ['email', 'first_name', 'last_name', 'avatar', 'phone', 'address']

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile