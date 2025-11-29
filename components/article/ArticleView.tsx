'use client';

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Calendar, User, Eye, Share2, BookmarkPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  description?: string;
  shortDescription?: string;
  content: string;
  publishDate: string;
  images?: Array<{
    url: string;
    deleteUrl: string;
    preference?: string;
  }>;
  views?: number;
}

interface ArticleViewProps {
  article: Article;
}

export function ArticleView({ article }: ArticleViewProps) {
  const [viewCount, setViewCount] = useState(article.views || 0);
  useEffect(() => {
    const incrementView = async () => {
      try {
        await fetch(`/api/articles/${article.id}/view`, {
          method: 'POST',
        });
        setViewCount(prev => prev + 1);
      } catch (error) {
        console.error('Error incrementing view count:', error);
      }
    };

    incrementView();
  }, [article.id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description || article.shortDescription,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="bg-white">
      {/* Featured Image */}
      {article.images && article.images.length > 0 && (
        <div className="aspect-video w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={article.images[0].url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <div className="mb-4">
          <Badge className="bg-orange-500 text-white mb-4 text-sm px-3 py-1">
            {article.category}
          </Badge>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
          {article.description || article.shortDescription}
        </p>

        {/* Article Meta */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <Image className="rounded-full" src="https://i.ibb.co/B2w6bXdt/Whats-App-Image-2025-09-25-at-22-45-33.jpg" width={64} height={64} alt="shubham" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.author}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{formatDate(article.publishDate)}</span>
            </div>

            <div className="flex items-center space-x-1 text-gray-500">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{viewCount.toLocaleString()} views</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-1"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <ContentPreview content={article.content} key={article.id} />
      </div>

      {/* Additional Images Gallery */}
      {article.images && article.images.length > 1 && (
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {article.images.slice(1).map((image, idx) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={image.url}
                  alt={`Gallery image ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Footer */}
      <footer className="border-t border-gray-200 pt-8">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <Image className="rounded-full" src="https://i.ibb.co/B2w6bXdt/Whats-App-Image-2025-09-25-at-22-45-33.jpg" width={64} height={64} alt="shubham" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">About {article.author}</h4>
              <p className="text-gray-600">Contributing Author at Kurukshetra</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {article.author} is a B.Tech student at NIT Srinagar. His writing is a pursuit of civilizational clarity, decoding the enduring war of ideas between Dharma and Adharma to understand Bharat's past, present, and future role.
          </p>
        </div>
      </footer>
    </article>
  );
}

// Fixed Content Preview Component with proper client-side navigation handling
function ContentPreview({ content }: { content: string }) {
  const [isClient, setIsClient] = useState(false);
  const [processedContent, setProcessedContent] = useState('');
  const [widgetContainerId] = useState(() => `twitter-container-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    setIsClient(true);

    if (!content) {
      setProcessedContent('');
      return;
    }

    // Clean and process content
    let cleanedContent = content
      // Remove all Twitter script tags to prevent conflicts
      .replace(/<script[^>]*src="https:\/\/platform\.twitter\.com\/widgets\.js"[^>]*><\/script>/g, '')
      .replace(/<script[^>]*async[^>]*src="https:\/\/platform\.twitter\.com\/widgets\.js"[^>]*><\/script>/g, '')
      .replace(/<script[^>]*charset="utf-8"[^>]*src="https:\/\/platform\.twitter\.com\/widgets\.js"[^>]*><\/script>/g, '')

      // Handle YouTube embeds
      .replace(/\[YOUTUBE\](https:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))\[\/YOUTUBE\]/g,
        (match, url, videoId) => {
          return `<div class="my-8">
            <div class="aspect-video w-full max-w-3xl mx-auto bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/${videoId}" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                class="w-full h-full">
              </iframe>
            </div>
          </div>`;
        })

      // Handle Twitter embeds with actual Twitter widget (custom format)
      .replace(/\[TWITTER\](https:\/\/(?:twitter\.com|x\.com)\/(\w+)\/status\/(\d+))\[\/TWITTER\]/g,
        (match, url, username, tweetId) => {
          return `<div class="my-8 flex justify-center">
            <blockquote class="twitter-tweet" data-theme="light" data-width="550" data-dnt="true">
              <p lang="en" dir="ltr">Loading tweet...</p>
              <a href="${url}">View Tweet</a>
            </blockquote>
          </div>`;
        })

      // Handle basic markdown formatting
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-orange-300 pl-6 py-2 my-6 bg-orange-50 italic text-gray-700 rounded-r-lg">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="list-disc ml-6 mb-1 text-gray-800">$1</li>');

    // Convert line breaks to paragraphs
    const paragraphs = cleanedContent.split('\n\n').filter(p => p.trim());
    const htmlContent = paragraphs.map(paragraph => {
      if (paragraph.includes('<div class="my-8">') ||
        paragraph.includes('<blockquote') ||
        paragraph.includes('<li class="list-disc')) {
        return paragraph;
      }
      return `<p class="mb-6 leading-relaxed text-gray-800 text-lg">${paragraph.replace(/\n/g, '<br>')}</p>`;
    }).join('');

    setProcessedContent(htmlContent);

  }, [content]);

  // Separate useEffect for Twitter widget loading with navigation fix
  useEffect(() => {
    if (!isClient || !processedContent) return;

    // Check if there are Twitter widgets in the content
    const hasTwitterWidgets = processedContent.includes('twitter-tweet');

    if (!hasTwitterWidgets) return;

    const loadTwitterWidgets = () => {
      // Force reload Twitter widgets for client-side navigation
      const container = document.getElementById(widgetContainerId);
      if (!container) return;

      if (window.twttr && window.twttr.widgets) {
        // Clear any existing widgets in this container first
        const existingWidgets = container.querySelectorAll('.twitter-tweet-rendered');
        existingWidgets.forEach(widget => {
          const parent = widget.parentNode;
          if (parent) {
            // Replace rendered widget with original blockquote
            const blockquote = widget.querySelector('blockquote');
            if (blockquote) {
              parent.replaceChild(blockquote, widget);
            }
          }
        });

        // Now load widgets in this specific container
        window.twttr.widgets.load(container);
      } else {
        // Load Twitter script if not already loaded
        const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://platform.twitter.com/widgets.js';
          script.async = true;
          script.charset = 'utf-8';
          script.onload = () => {
            if (window.twttr && window.twttr.widgets) {
              window.twttr.widgets.load(container);
            }
          };
          document.head.appendChild(script);
        } else {
          // Script exists but might not be ready
          const checkAndLoad = () => {
            if (window.twttr && window.twttr.widgets) {
              window.twttr.widgets.load(container);
            } else {
              setTimeout(checkAndLoad, 100);
            }
          };
          checkAndLoad();
        }
      }
    };

    // Use a timeout to ensure DOM is ready
    const timer = setTimeout(loadTwitterWidgets, 300);

    return () => {
      clearTimeout(timer);
    };

  }, [isClient, processedContent, widgetContainerId]);

  // Return placeholder during SSR and initial client render
  if (!isClient) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
        </div>
      </div>
    );
  }

  if (!processedContent) {
    return <p className="text-gray-500 italic">No content available.</p>;
  }

  return (
    <div
      id={widgetContainerId}
      dangerouslySetInnerHTML={{ __html: processedContent }}
      className="twitter-content prose prose-lg max-w-none"
      suppressHydrationWarning={true}
    />
  );
}

// TypeScript declaration for Twitter widget
declare global {
  interface Window {
    twttr: {
      widgets: {
        load: (element?: HTMLElement) => Promise<void>;
      };
    };
  }
}
