from rest_framework import serializers
from .models import BlogPost
from apps.user.models import User

class BlogPostSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())  # Linking to the User model
    created_at = serializers.DateTimeField(read_only=True)  # Auto-filled on creation
    updated_at = serializers.DateTimeField(read_only=True)  # Auto-filled on update

    class Meta:
        model = BlogPost
        fields = ['post_id', 'user_id', 'title', 'content', 'created_at', 'updated_at']
        read_only_fields = ['post_id', 'created_at', 'updated_at']  # Making id and timestamps read-only

    def create(self, validated_data):
        # Creating a new BlogPost instance
        user = validated_data.get('user_id')  # Getting the associated user
        title = validated_data.get('title')  # Getting the title
        content = validated_data.get('content')  # Getting the content

        # Create and save the BlogPost instance
        blog_post = BlogPost.objects.create(user_id=user, title=title, content=content)
        return blog_post

    def update(self, instance, validated_data):
        # Updating the BlogPost instance with the new data
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance
