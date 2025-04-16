from django.urls import path
from .views import ProfileDetail, AvatarUpdate, PasswordChangeView

urlpatterns = [
    path('me/', ProfileDetail.as_view(), name='profile-detail'),
    path('me/avatar/', AvatarUpdate.as_view(), name='avatar-update'),
    path('me/change-password/', PasswordChangeView.as_view(), name='change-password'),
]