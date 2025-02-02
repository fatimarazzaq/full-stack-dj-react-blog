from rest_framework import generics
from .models import BlogPost
from .serializers import BlogPostSerializer
from .permissions import IsAuthorOrReadOnly  # Import the custom permission
from rest_framework import permissions

# View to list all blog posts or create a new one
class BlogPostListCreateView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Only authenticated users can create posts

    def perform_create(self, serializer):
        # Automatically set the user_id to the currently authenticated user
        serializer.save(user_id=self.request.user)

# View to retrieve, update, or delete a specific blog post
class BlogPostRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]  # Add custom permission

    def perform_update(self, serializer):
        # Ensure the user_id remains unchanged during an update
        serializer.save(user_id=self.get_object().user_id)