'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  publishDate: string;
  images: Array<{
    url: string;
    deleteUrl: string;
    preference?: string;
  }>;
}

interface ArticleSidebarProps {
  currentArticleId: string;
  category: string;
}

export function ArticleSidebar({ currentArticleId, category }: ArticleSidebarProps) {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebarContent = async () => {
      try {
        setLoading(true);
        
        // Fetch related articles from the same category
        const relatedResponse = await fetch(
          `/api/articles/category/${category.toLowerCase()}?limit=4&page=1`
        );
        
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          // Filter out current article
          const filteredRelated = relatedData.data.filter(
            (article: Article) => article.id !== currentArticleId
          ).slice(0, 3);
          setRelatedArticles(filteredRelated);
        }

        // Fetch trending articles
        const trendingResponse = await fetch('/api/articles?type=trending&limit=3');
        if (trendingResponse.ok) {
          const trendingData = await trendingResponse.json();
          const filteredTrending = trendingData.data.filter(
            (article: Article) => article.id !== currentArticleId
          );
          setTrendingArticles(filteredTrending);
        }

      } catch (error) {
        console.error('Error fetching sidebar content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarContent();
  }, [currentArticleId, category]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex space-x-3 animate-pulse">
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Related Articles
          </h3>
          <div className="space-y-4">
            {relatedArticles.map((article) => (
              <Link key={article.id} href={`/article/${article.id}`} className="group block">
                <div className="flex space-x-3">
                  <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden rounded border">
                    <Image
                      src={article.images[0]?.url || '/api/placeholder/100/80'}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link 
            href={`/category/${category.toLowerCase()}`}
            className="inline-block mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium"
          >
            View more in {category} →
          </Link>
        </div>
      )}

      {/* Trending Articles */}
      {trendingArticles.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            🔥 Trending Now
          </h3>
          <div className="space-y-4">
            {trendingArticles.map((article, index) => (
              <Link key={article.id} href={`/article/${article.id}`} className="group block">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        {article.category}
                      </Badge>
                      <span className="ml-2">{formatDate(article.publishDate)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}