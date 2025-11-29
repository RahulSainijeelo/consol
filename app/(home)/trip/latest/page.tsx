'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';

interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  timeAgo?: string;
  publishDate: string;
}

interface ApiResponse {
  data: Article[];
  pagination: {
    currentPage: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  type: string;
}

export default function LatestNewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<ApiResponse['pagination'] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/articles?type=latest&page=${page}&limit=10`);
      if (!response.ok) throw new Error('Failed to fetch articles');
      
      const data: ApiResponse = await response.json();
      setArticles(data.data);
      setPagination(data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(1);
  }, []);

  const handlePageChange = (page: number) => {
    fetchArticles(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="container mx-auto !px-4 !py-8">
        <div className="border-l-4 border-orange-500 pl-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Latest articles</h1>
          {pagination && (
            <p className="text-gray-600 mt-2">
              Showing {((currentPage - 1) * pagination.limit) + 1} - {Math.min(currentPage * pagination.limit, pagination.totalCount)} of {pagination.totalCount} articles
            </p>
          )}
        </div>

        {loading ? (
          <div className="space-y-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {articles.map((article) => (
                <article key={article.id} className="border-b border-gray-200 pb-6">
                  <Link href={`/article/${article.id}`} className="group">
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>By {article.author}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {article.category}
                        </span>
                      </div>
                      <span>{article.timeAgo}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                {[...Array(pagination.totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === pagination.totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 border rounded-md ${
                          page === currentPage
                            ? 'bg-orange-600 text-white border-orange-600'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}