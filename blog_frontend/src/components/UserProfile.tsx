import React from 'react';
import { Calendar, Mail, PenSquare } from 'lucide-react';
import { User, BlogPost } from '../types';
import { BlogCard } from './BlogCard';

interface UserProfileProps {
  user: User;
  onCreatePost: () => void;
  onSelectPost: (post: BlogPost) => void;
}

export function UserProfile({ user, onCreatePost, onSelectPost }: UserProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-blue-600">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="absolute bottom-0 left-8 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-white object-cover"
          />
        </div>
        
        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center gap-4 text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <Mail size={16} />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Joined {new Date(user.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <button
              onClick={onCreatePost}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PenSquare size={20} />
              Create Post
            </button>
          </div>
          
          <p className="mt-6 text-gray-600">{user.bio}</p>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6">My Posts</h2>
            {user.posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {user.posts.map(post => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    onClick={() => onSelectPost(post)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center py-12 text-gray-500">
                You haven't created any posts yet. Click the "Create Post" button to get started!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}