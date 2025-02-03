from django.db import models
from apps.user.models import User
from common.utils.utility_functions import generate_shortuuid

# Create your models here.

class BlogPost(models.Model):
    post_id = models.CharField(primary_key=True,max_length=22,default=generate_shortuuid,editable=False)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE,null=True,db_constraint=False)
    title = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Blog_Post"
        verbose_name_plural = "Blog_Posts"

    def __str__(self):
        return self.title
