export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl: string;
  date: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string;
  joinDate: string;
  posts: BlogPost[];
}