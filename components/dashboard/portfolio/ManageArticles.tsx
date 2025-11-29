"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ArticleItems from "./ArticleItems";
import DeleteArticleDialog from "./DeleteArticleDialog";
import type { Article } from "@/types/Article";
import Link from "next/link";

interface ArticleFormState {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string; // Changed from shortDescription to match API
  content: string;
  images: { url: string; deleteUrl: string }[];
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
}

const newsCategories = [
  "Politics",
  "Dharm",
  "Bharat",
  "Global",
  "History",
];

const emptyForm: ArticleFormState = {
  id: "",
  title: "",
  author: "",
  category: "",
  description: "", // Changed from shortDescription
  content: "",
  images: [],
  status: 'draft',
  publishDate: "",
};

export function ManageArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (force = false) => {
    setLoading(true);
    setError(null);
    
    const CACHE_DURATION = 120000; // 2 minutes
    const cacheKey = `dashboard_articles_${selectedCategory}_${selectedStatus}`;
    const cached = sessionStorage.getItem(cacheKey);
    const cachedAt = sessionStorage.getItem(`${cacheKey}_at`);
    const now = Date.now();

    // Use cache if available and not forced refresh
    if (
      !force &&
      cached &&
      cachedAt &&
      now - Number(cachedAt) < CACHE_DURATION
    ) {
      try {
        const cachedArticles = JSON.parse(cached);
        if (Array.isArray(cachedArticles)) {
          setArticles(cachedArticles);
          setLoading(false);
          return;
        }
      } catch (error) {
        // Clear corrupted cache
        sessionStorage.removeItem(cacheKey);
        sessionStorage.removeItem(`${cacheKey}_at`);
      }
    }

    try {
      // Use your new dashboard API endpoint
      const url = new URL("/api/dashboard/articles", window.location.origin);
      
      // Add query parameters for filtering
      if (selectedCategory !== "all") {
        url.searchParams.append("category", selectedCategory);
      }
      if (selectedStatus !== "all") {
        url.searchParams.append("status", selectedStatus);
      }

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();
      
      // Handle different response formats
      let articlesData: Article[];
      if (response.data && Array.isArray(response.data)) {
        // New API format with pagination
        articlesData = response.data;
      } else if (Array.isArray(response)) {
        // Direct array format
        articlesData = response;
      } else {
        throw new Error("Invalid response format");
      }

      setArticles(articlesData);
      
      // Cache the results
      sessionStorage.setItem(cacheKey, JSON.stringify(articlesData));
      sessionStorage.setItem(`${cacheKey}_at`, now.toString());
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch articles";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setArticles([]); // Set empty array on error
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, selectedStatus]); // Refetch when filters change

  const openDeleteDialog = (article: Article) => {
    setSelectedArticle(article);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteArticle = async () => {
    if (!selectedArticle?.id) {
      toast({
        title: "Error",
        description: "No article selected for deletion",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/articles", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedArticle.id }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP error! status: ${res.status}`);
      }

      toast({
        title: "Success!",
        description: "Article has been deleted successfully",
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedArticle(null);
      
      // Clear cache and refresh
      sessionStorage.removeItem(`dashboard_articles_${selectedCategory}_${selectedStatus}`);
      sessionStorage.removeItem(`dashboard_articles_${selectedCategory}_${selectedStatus}_at`);
      await fetchArticles(true);
      
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete article";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleStatusChange = async (articleId: string, newStatus: 'draft' | 'published' | 'archived') => {
    if (!articleId) {
      toast({
        title: "Error",
        description: "Invalid article ID",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Use the main articles API with PUT method (since you don't have a separate status endpoint)
      const res = await fetch("/api/articles", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: articleId, status: newStatus }),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `HTTP error! status: ${res.status}`);
      }
      
      toast({
        title: "Success!",
        description: `Article status updated to ${newStatus}`,
      });
      
      // Clear cache and refresh
      sessionStorage.removeItem(`dashboard_articles_${selectedCategory}_${selectedStatus}`);
      sessionStorage.removeItem(`dashboard_articles_${selectedCategory}_${selectedStatus}_at`);
      await fetchArticles(true);
      
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update article status";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  // Safe filtering with null checks
  const filteredArticles = (articles || []).filter(article => {
    if (!article) return false;
    
    const matchesSearch = (
      (article.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.author || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (article.description || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || article.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleRefresh = () => {
    // Clear all cache entries
    const keys = Object.keys(sessionStorage);
    keys.forEach(key => {
      if (key.startsWith('dashboard_articles_')) {
        sessionStorage.removeItem(key);
      }
    });
    fetchArticles(true);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedStatus("all");
  };

  return (
    <div className="space-y-6" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg border bg-gray-50 border-gray-200">
        <div>
          <h2 className="text-2xl font-semibold mb-1 text-gray-900">
            Article Management
          </h2>
          <p className="text-base text-gray-600">
            Manage your news articles and content
          </p>
          {error && (
            <p className="text-sm text-red-600 mt-1">
              Error: {error}
            </p>
          )}
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            disabled={loading}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link
            href="/dashboard/create-article"
            className="inline-flex items-center gap-2 px-6 py-3 font-medium bg-blue-600 text-white border-none rounded-lg text-sm shadow-sm hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Create New Article
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search articles by title, author, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {newsCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-36">
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredArticles.length} of {articles.length} articles
          </span>
          {(searchTerm || selectedCategory !== "all" || selectedStatus !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 p-6 bg-white">
        {loading && articles.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading articles...</p>
            </div>
          </div>
        ) : filteredArticles.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              {articles.length === 0 ? 'No articles found.' : 'No articles match your current filters.'}
            </p>
            {articles.length > 0 && (
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <ArticleItems
            articles={filteredArticles}
            openDeleteDialog={openDeleteDialog}
            onStatusChange={handleStatusChange}
            loading={loading}
          />
        )}
      </div>

      <DeleteArticleDialog
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleDeleteArticle={handleDeleteArticle}
        selectedArticle={selectedArticle}
        loading={loading}
      />
    </div>
  );
}
