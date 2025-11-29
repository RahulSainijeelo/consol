export interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  content: string;
  images: string[];
  status: 'draft' | 'published' | 'archived';
  publishDate?: string;
  createdAt: string;
  updatedAt: string;
  slug?: string;
  readTime?: number;
  wordCount?: number;
}
