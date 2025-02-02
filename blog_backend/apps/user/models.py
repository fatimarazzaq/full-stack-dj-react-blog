from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.utils import timezone
from common.utils.utility_functions import generate_shortuuid


# Create your models here.


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None,is_active=False,is_staff=False,is_admin=False):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        if not password:
            raise ValueError('Password is required')

        if not username:
            raise ValueError('Username is required')

        user = self.model(
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.is_staff = is_staff
        user.is_admin = is_admin
        user.is_active = is_active
        user.save(using=self._db)
        return user

    def create_staffuser(self,email,username,password=None):
        user = self.create_user(email,username,password=password,is_active=True,is_staff=True)
        return user
    def create_superuser(self,email,username,password=None):
        user = self.create_user(email,username,password=password,is_active=True,is_staff=True,is_admin=True)
        return user



class User(AbstractBaseUser):
    id = models.CharField(primary_key=True, max_length=22, default=generate_shortuuid, editable=False)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100,unique=True)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)


    objects = UserManager()


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # other fields...

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True