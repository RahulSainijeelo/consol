import React from "react";
import type { Article } from "@/types/Article";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Eye, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ArticleItemsProps {
  articles: any;
  openDeleteDialog: (article: Article) => void;
  onStatusChange: (articleId: string, newStatus: 'draft' | 'published' | 'archived') => void;
  loading: boolean;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'draft':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'archived':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryColor = (category: string) => {
  const colors = {
    'Politics': 'bg-blue-100 text-blue-800',
    'Bollywood & Sports': 'bg-pink-100 text-pink-800',
    'Dharm': 'bg-orange-100 text-orange-800',
    'Bharat': 'bg-indigo-100 text-indigo-800',
    'Global': 'bg-teal-100 text-teal-800',
    'History': 'bg-amber-100 text-amber-800',
    'About': 'bg-gray-100 text-gray-800',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

const ArticleItems: React.FC<ArticleItemsProps> = ({
  articles,
  openDeleteDialog,
  onStatusChange,
  loading,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg border bg-white">
            <Skeleton className="aspect-video w-full mb-4" />
            <div className="px-4 pb-4">
              <Skeleton className="h-6 w-2/3 mb-2" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <div className="flex justify-between gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Pencil className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-500 mb-6">Get started by creating your first article.</p>
        <Link href="/dashboard/create-article">
          <Button className="bg-blue-600 hover:bg-blue-700">
            Create New Article
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article:any) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          
          {article.images && article.images.length > 0 && (
            <div className="aspect-video relative">
              <Image
                src={article.images[0].url}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          )}

          <CardHeader className="pb-3">
            {/* Category and Status */}
            <div className="flex items-center justify-between mb-3">
              <Badge className={getCategoryColor(article.category)}>
                {article.category}
              </Badge>
              
              <Select
                value={article.status}
                onValueChange={(value) => onStatusChange(article.id, value as 'draft' | 'published' | 'archived')}
              >
                <SelectTrigger className="w-auto h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <CardTitle className="text-lg leading-tight line-clamp-2">
              {article.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="pb-3">
            {/* Article Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{format(new Date(article.publishDate || article.createdAt), 'MMM dd, yyyy')}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-3">
              {article.shortDescription}
            </p>

            {/* Word Count and Reading Time */}
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span>{article.content?.split(/\s+/).length || 0} words</span>
              <span>•</span>
              <span>{Math.ceil((article.content?.split(/\s+/).length || 0) / 200)} min read</span>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between gap-2 pt-3">
            {/* View Article */}
            <Link href={`/article/${article.slug || article.id}`} target="_blank">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                View
              </Button>
            </Link>

            <div className="flex gap-2">
              {/* Edit Article */}
              <Link href={`/dashboard/edit-article/${article.id}`}>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
              </Link>

              {/* Delete Article */}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => openDeleteDialog(article)}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ArticleItems;
