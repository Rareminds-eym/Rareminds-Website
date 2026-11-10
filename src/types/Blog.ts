export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  publishDate: string;
  readTime: number;
  tags: string[];
  keyPoints: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
  description?: string;
}
