import React from 'react';
import { Calendar, User } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <article 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="inline-flex items-center gap-1">
            <Calendar size={16} />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            <User size={16} />
            {post.author}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h2>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {post.category}
        </span>
      </div>
    </article>
  );
}