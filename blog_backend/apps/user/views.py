from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import authenticate
from .serializers import CustomLoginSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect

# for custom refresh token reponse 
from django.urls import reverse
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
from rest_framework_simplejwt.exceptions import TokenError
from .models import User
from .serializers import UserRegisterSerializer,CheckEmailVerifySerializer,ChangePasswordSerializer,ResetPasswordEmailSerializer


from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMessage
from django.contrib import messages

# Assuming account_activation_token is defined somewhere in your project
from .tokens import account_activation_token
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

from rest_framework.decorators import api_view

# Social Imports
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView

from drf_spectacular.utils import extend_schema
from django.contrib.auth import update_session_auth_hash

from rest_framework.decorators import api_view,permission_classes



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info(request):
    print(request.user)
    user = {
        "profile_id":request.user.userprofile.profile_id,
        "username":request.user.username,
        "email":request.user.email,
        "first_name":request.user.userprofile.first_name,
        "last_name":request.user.userprofile.last_name,
        "phone_number":request.user.userprofile.phone_number,
        "address":request.user.userprofile.address,
        "date_of_birth":request.user.userprofile.date_of_birth,

    }
    return Response(user,status=status.HTTP_200_OK)




@api_view(('GET',))
@permission_classes([])
def account_activate(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)

        # if not account_activation_token.check_token(user, token):
        #     return Response({'error': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)

        user.is_active = True
        user.save()
        
        return Response({'message': 'Email verified successfully!'}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def activateEmail(request, user, to_email):
    site = get_current_site(request)
    print(f"{settings.SITE_URL}{reverse('activate', kwargs={'uidb64': urlsafe_base64_encode(force_bytes(user.pk)), 'token': account_activation_token.make_token(user)})}")
    verification_url = f"{settings.FRONTEND_URL}/verify-email?uid={urlsafe_base64_encode(force_bytes(user.pk))}&token={account_activation_token.make_token(user)}"
    mail_subject = 'Activate your user account.'
    message = render_to_string('email/template_activate_account.html', {
        'user': user.username,
        'domain': get_current_site(request).domain,
        'uid': urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http',
        'verification_url': verification_url,
    })
    print(verification_url)
    email = EmailMessage(mail_subject, message, to=[to_email])
    email.content_subtype = 'html'
    if email.send():
        messages.success(request, f'An email has been sent to {to_email} to activate your account.')
    else:
        messages.error(request, f'Problem sending confirmation email to {to_email}, check if you typed it correctly.')




class UserRegisterView(APIView):
    permission_classes = []
    @extend_schema(
        request=UserRegisterSerializer,
        responses={201: UserRegisterSerializer}
    )
    def post(self,request,format=None):
        serializer = UserRegisterSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            user_data = UserRegisterSerializer(user).data
            print(user_data)
            # user.is_active = True
            # user.save()
            activateEmail(request, user, user_data['email'])

            return Response({'message':'Registered Successfully! Please confirm your email to activate your account.'},status=status.HTTP_201_CREATED)

        return Response({'message':'Registration Failed'},status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    @extend_schema(
        request=ChangePasswordSerializer,
        responses={200: ChangePasswordSerializer}
    )
    def post(self,request,format=None):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                update_session_auth_hash(request, user)
                return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserVerifyCheckView(APIView):
    permission_classes = []

    @extend_schema(
        request=CheckEmailVerifySerializer,
        responses={200: CheckEmailVerifySerializer}
    )

    def post(self,request,format=None):
        serializer = CheckEmailVerifySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'message':'Email is Verified'},status=status.HTTP_200_OK)

        return Response({'message':'Email not verified'},status=status.HTTP_400_BAD_REQUEST)



class CustomTokenRefreshView(APIView):
    """
    Custom view to refresh the access token only.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token_str = request.data.get('refresh')

        if not refresh_token_str:
            return Response({
                'status': 400,
                'message': 'Refresh token not provided',
                'errors': 'Missing refresh token in request data'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create a RefreshToken instance
            refresh = RefreshToken(refresh_token_str)
            # Generate new access token
            data = {
                'access': str(refresh.access_token),
            }
            return Response(data)
        except Exception as e:
            return Response({
                'status': 400,
                'message': 'Invalid refresh token',
                'errors': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
        
        

class CustomLoginView(APIView):
    permission_classes = []
    @extend_schema(
            request=CustomLoginSerializer,
            responses={200:CustomLoginSerializer}
    )
    def post(self, request):
        try:
            data = request.data
            serializer = CustomLoginSerializer(data=data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                password = serializer.validated_data['password']
                
                user = authenticate(request, username=email, password=password)
                
                if user is not None:
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'user-id': user.id,
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({
                        'status': 400,
                        'message': 'Invalid email or password',
                    }, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({
                'status': 400,
                'message': 'Invalid data',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({
                'status': 500,
                'message': 'An error occurred',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class CustomLogoutView(APIView):
    permission_classes = [IsAuthenticated,]

    def post(self,request):
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message":"Successfully logged out"},status=200)
        except Exception as e:
            return Response({"error":str(e)},status=400)



# Social Authentication

class GoogleLogin(SocialLoginView): 
    permission_classes=[]
    adapter_class = GoogleOAuth2Adapter

class FacebookLogin(SocialLoginView):
    permission_classes=[]
    adapter_class = FacebookOAuth2Adapter







