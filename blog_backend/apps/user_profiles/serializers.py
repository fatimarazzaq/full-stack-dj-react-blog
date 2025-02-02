from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['profile_id', 'user_id', 'first_name', 'last_name', 'phone_number', 'address', 'date_of_birth', 'created_at', 'updated_at']
        read_only_fields = ['profile_id', 'user_id', 'created_at', 'updated_at']
