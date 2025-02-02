from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import User


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    class Meta:
        model = User
        fields = ['email','username','password','password2']
    
    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password!=password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        return attrs

    def create(self,validated_data):
        return User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=validated_data.get("password"))



class CheckEmailVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=150)

    def validate(self, data):
        # Check if the passwords match
        try:
            user = User.objects.get(email=data['email'])
            if not user.is_active:
               raise serializers.ValidationError("This user email is not verified")
            return user 
        except User.DoesNotExist:
            raise serializers.ValidationError({"message":"The user doesn't exsist","status":404})



class CustomRegisterSerializer(RegisterSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, data):
        # Check if the passwords match
        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match.")
        
        # Check if email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        
        return data

    def save(self, request):
        user = User(
            username=self.validated_data.get('username'),
            email=self.validated_data.get('email')
        )
        user.set_password(self.validated_data.get('password1'))
        user.save()
        return user
    

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

class CustomLoginSerializer(LoginSerializer):
    email = serializers.EmailField(required=True)

    def get_auth_user(self, email, password):
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid email')
        
        if not user.check_password(password):
            raise serializers.ValidationError('Invalid password')
        
        if not user.is_active:
            raise serializers.ValidationError('User account is not active. Please verify your email address.')
        
        return user

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = self.get_auth_user(email, password)
        
        if user:
            attrs['user'] = user
        
        return attrs
    


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
