from django.urls import path
from .views import UserProfileUpdateView,UserProfileDetailView


urlpatterns = [
    path("update/<str:profile_id>/",UserProfileUpdateView.as_view(),name="user_profile_update"),
    path("<str:profile_id>/",UserProfileDetailView.as_view(),name="user_profile_detail"),
]
