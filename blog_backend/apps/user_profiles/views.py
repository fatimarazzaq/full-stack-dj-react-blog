from django.shortcuts import render
from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.http import Http404
from .permissions import IsOwner
from drf_spectacular.utils import extend_schema

# Create your views here.


def get_object(profile_id):
    try:
        return UserProfile.objects.get(profile_id=profile_id)
    except UserProfile.DoesNotExist:
        raise Http404


class UserProfileDetailView(APIView):
    """
    Retrieve user profile instance.
    """
    permission_classes = [IsAuthenticated,IsOwner]
    def get(self, request, profile_id, format=None):
        if profile_id:
            self.check_permissions(request)
            profile = get_object(profile_id)
            self.check_object_permissions(request, profile)
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class UserProfileUpdateView(APIView):
    """
    Update a user profile instance.
    """
    permission_classes = [IsAuthenticated,IsOwner]
    @extend_schema(
        request=UserProfileSerializer,
        responses={200: UserProfileSerializer}
    )
    def put(self, request, profile_id, format=None):
        self.check_permissions(request)
        profile = get_object(profile_id)
        self.check_object_permissions(request, profile)
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


