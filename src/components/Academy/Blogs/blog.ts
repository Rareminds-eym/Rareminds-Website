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
}
