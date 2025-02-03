from django.urls import path
from . import views

urlpatterns = [
    path('', views.BlogPostListView.as_view(), name='blog-list-view'),
    path('create/', views.BlogPostCreateView.as_view(), name='blog-create-view'),
    path('update/<str:post_id>/', views.BlogPostUpdateView.as_view(), name='blog-update-view'),
    path('detail/<str:post_id>/', views.BlogPostDetailView.as_view(), name='blog-detail-view'),
    path('delete/<str:post_id>/', views.BlogPostDeleteView.as_view(), name='blog-delete-view'),
]