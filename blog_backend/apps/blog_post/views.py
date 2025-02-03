from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import BlogPost
from .serializers import BlogPostSerializer
from .permissions import IsOwner
from drf_spectacular.utils import extend_schema



class BlogPostListView(generics.ListAPIView):
    """
    List all blog posts.
    """
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticated]


class BlogPostDetailView(APIView):
    """
    Retrieve a blog post instance.
    """
    permission_classes = [IsAuthenticated, IsOwner]

    def get(self, request, post_id, format=None):
        blog_post = get_object_or_404(BlogPost, id=post_id)
        self.check_object_permissions(request, blog_post)
        serializer = BlogPostSerializer(blog_post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogPostUpdateView(APIView):
    """
    Update a blog post instance.
    """
    permission_classes = [IsAuthenticated, IsOwner]

    @extend_schema(
        request=BlogPostSerializer,
        responses={200: BlogPostSerializer}
    )
    def put(self, request, post_id, format=None):
        blog_post = get_object_or_404(BlogPost, id=post_id)
        self.check_object_permissions(request, blog_post)
        serializer = BlogPostSerializer(blog_post, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogPostCreateView(APIView):
    """
    Create a new blog post instance.
    """
    permission_classes = [IsAuthenticated]

    @extend_schema(
        request=BlogPostSerializer,
        responses={201: BlogPostSerializer}
    )
    def post(self, request, format=None):
        serializer = BlogPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user_id=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogPostDeleteView(APIView):
    """
    Delete a blog post instance.
    """
    permission_classes = [IsAuthenticated, IsOwner]

    def delete(self, request, post_id, format=None):
        blog_post = get_object_or_404(BlogPost, id=post_id)
        self.check_object_permissions(request, blog_post)
        blog_post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)