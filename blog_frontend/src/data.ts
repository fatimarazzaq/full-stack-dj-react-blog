import { BlogPost, Category, User } from './types';

export const currentUser: User = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah@example.com",
  bio: "Tech enthusiast and web developer. Love writing about the latest trends in technology.",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  joinDate: "2024-01-01",
  posts: []
};

export const posts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt: "Exploring the latest trends and technologies shaping the future of web development.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Sarah Johnson",
    category: "Technology",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    excerpt: "A comprehensive guide to using React Hooks effectively in your applications.",
    content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author: "Michael Chen",
    category: "Development",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    date: "2024-03-14"
  },
  {
    id: 3,
    title: "Design Systems in 2024",
    excerpt: "How modern design systems are evolving to meet the needs of growing organizations.",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    author: "Emma Wilson",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    date: "2024-03-13"
  }
];

export const categories: Category[] = [
  { name: "All", count: posts.length },
  { name: "Technology", count: posts.filter(post => post.category === "Technology").length },
  { name: "Development", count: posts.filter(post => post.category === "Development").length },
  { name: "Design", count: posts.filter(post => post.category === "Design").length }
];