import React, { useState } from 'react';
import { Layout, Search, User as UserIcon } from 'lucide-react';
import { BlogCard } from './components/BlogCard';
import { PostDetail } from './components/PostDetail';
import { UserProfile } from './components/UserProfile';
import { CreatePost } from './components/CreatePost';
import { posts, categories, currentUser } from './data';
import { BlogPost } from './types';

function App() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [userPosts, setUserPosts] = useState<BlogPost[]>([]);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreatePost = (newPost: Omit<BlogPost, 'id' | 'date' | 'author'>) => {
    const post: BlogPost = {
      ...newPost,
      id: posts.length + 1,
      date: new Date().toISOString(),
      author: currentUser.name
    };
    setUserPosts([post, ...userPosts]);
    setShowCreatePost(false);
  };

  if (showProfile) {
    return (
      <div>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
                <Layout className="text-blue-600" />
                <span>Blog</span>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Back to Posts
              </button>
            </div>
          </div>
        </header>
        <UserProfile
          user={{ ...currentUser, posts: userPosts }}
          onCreatePost={() => setShowCreatePost(true)}
          onSelectPost={setSelectedPost}
        />
        {showCreatePost && (
          <CreatePost
            onClose={() => setShowCreatePost(false)}
            onSubmit={handleCreatePost}
          />
        )}
      </div>
    );
  }

  if (selectedPost) {
    return <PostDetail post={selectedPost} onBack={() => setSelectedPost(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <Layout className="text-blue-600" />
              <span>Blog</span>
            </div>
            <button
              onClick={() => setShowProfile(true)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <UserIcon size={20} />
              My Profile
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-64">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      selectedCategory === category.name
                        ? 'bg-blue-100 text-blue-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No posts found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;