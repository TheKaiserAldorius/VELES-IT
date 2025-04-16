from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import update_session_auth_hash
from .models import UserProfile
from .serializers import ProfileSerializer, AvatarUploadSerializer, PasswordChangeSerializer

class ProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class AvatarUpdate(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = AvatarUploadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class PasswordChangeView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PasswordChangeSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        if not user.check_password(serializer.data['old_password']):
            return Response(
                {"old_password": ["Wrong password."]}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.set_password(serializer.data['new_password'])
        user.save()
        update_session_auth_hash(request, user)
        return Response({"status": "password changed"})