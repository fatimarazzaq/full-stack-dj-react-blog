from django.db import models
from common.utils.utility_functions import generate_shortuuid
from apps.user.models import User

# Create your models here.

class UserProfile(models.Model):
    profile_id = models.CharField(primary_key=True,max_length=22,default=generate_shortuuid,editable=False)
    user_id = models.OneToOneField(User,on_delete=models.CASCADE,null=True,blank=True)
    first_name = models.CharField(max_length=255,null=True,blank=True)
    last_name = models.CharField(max_length=255,null=True,blank=True)
    phone_number = models.CharField(max_length=100,null=True,blank=True)
    address = models.TextField(null=True,blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='media/', blank=True, null=True)


    class Meta:
        verbose_name = "User_Profile"
        verbose_name_plural = "User_Profiles"

    def __str__(self):
        return f"{self.user_id} - profile"
    

