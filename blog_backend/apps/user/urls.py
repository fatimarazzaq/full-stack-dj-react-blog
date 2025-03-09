from django.urls import path,include
from .views import (CustomLoginView
                    ,CustomLogoutView
                    ,CustomTokenRefreshView
                    ,UserRegisterView
                    ,account_activate
                    ,FacebookLogin
                    ,GoogleLogin,UserVerifyCheckView,user_info
                    ,ChangePasswordView)


urlpatterns = [

    path('register/', UserRegisterView.as_view(),name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('change_password/', ChangePasswordView.as_view(), name='change_password'),
    path('user/',user_info,name="user-info"),

    path('logout/', CustomLogoutView.as_view(), name='logout'),
    # path('', include('dj_rest_auth.urls')),

    path('email/verify/', UserVerifyCheckView.as_view(), name='check_email_verify'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),

    path('account-activate/<uidb64>/<token>/', account_activate, name='activate'),

    # social auth urls
    path('facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('google/', GoogleLogin.as_view(), name='google_login')

]
