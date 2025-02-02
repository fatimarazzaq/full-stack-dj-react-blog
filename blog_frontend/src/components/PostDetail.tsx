import React from 'react';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export function PostDetail({ post, onBack }: PostDetailProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
      >
        <ArrowLeft size={20} />
        Back to posts
      </button>
      
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-xl mb-8"
      />
      
      <div className="flex items-center gap-4 text-gray-600 mb-4">
        <span className="inline-flex items-center gap-1">
          <Calendar size={16} />
          {new Date(post.date).toLocaleDateString()}
        </span>
        <span className="inline-flex items-center gap-1">
          <User size={16} />
          {post.author}
        </span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {post.category}
        </span>
      </div>
      
      <h1 className="text-4xl font-bold mb-6 text-gray-900">{post.title}</h1>
      <p className="text-gray-600 leading-relaxed">{post.content}</p>
    </div>
  );
}