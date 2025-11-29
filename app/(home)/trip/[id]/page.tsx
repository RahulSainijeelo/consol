import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import { JsonLd } from '@/components/seo/JsonLd';
import Footer from '@/components/layout/Footer';
import { demoTrip } from '@/public/demo-trip';

interface TripPageProps {
  params: Promise<{
    id: string;
  }>;
}
async function getTrip(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles/${id}`,
      {
        next: { revalidate: 300 }
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const article = await response.json();
    return article;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

function extractKeywords(content: string): string[] {
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can'];

  return content
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word))
    .reduce((acc: string[], word) => {
      if (!acc.includes(word)) acc.push(word);
      return acc;
    }, [])
    .slice(0, 20); // Top 20 keywords
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const trip = demoTrip;

  if (!trip) {
    return {
      title: 'Trip Not Found - Kurukshetra',
      description: 'The requested trip could not be found.',
    };
  }

  const publishedTime = new Date(trip.publishDate).toISOString();
  const modifiedTime = trip.updatedDate ? new Date(trip.updatedDate).toISOString() : publishedTime;

  return {
    title: `${trip.title} - Kurukshetra`,
    description: trip.description || trip.shortDescription || trip.title.slice(0, 160),
    keywords: [
      trip.category.toLowerCase(),
      trip.author.toLowerCase(),
      'kurukshetra',
      'dharma',
      'news',
      'truth',
      'authentic journalism',
      ...extractKeywords(trip.content)
    ].join(', '),

    authors: [{ name: trip.author, url: `/author/${slugify(trip.author)}` }],
    category: trip.category,

    openGraph: {
      title: trip.title,
      description: trip.description || trip.shortDescription,
      url: `/trip/${id}`,
      siteName: 'Kurukshetra.info',
      locale: 'en_IN',
      type: 'article',
      publishedTime,
      modifiedTime,
      expirationTime: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      authors: [trip.author],
      section: trip.category,
      tags: extractKeywords(trip.content),
      images: trip.images?.map((img: any, index: any) => ({
        url: img.url,
        width: 1200,
        height: 630,
        alt: `${trip.title} - Image ${index + 1}`,
        type: 'image/jpeg',
      })) || [],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@kurukshetra',
      creator: `@${slugify(trip.author)}`,
      title: trip.title,
      description: trip.description || trip.shortDescription,
      images: trip.images?.[0]?.url ? [trip.images[0].url] : [],
    },

    alternates: {
      canonical: `/news/${id}`,
    },

    other: {
      'article:published_time': publishedTime,
      'article:modified_time': modifiedTime,
      'article:author': trip.author,
      'article:section': trip.category,
      'article:tag': extractKeywords(trip.content).join(','),
    },
  };
}



export default async function TripPage({ params }: TripPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const trip = await demoTrip;
  if (!trip) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": trip.title,
    "description": trip.description || trip.shortDescription,
    "image": trip.images?.map((img: any) => img.url) || [],
    "author": {
      "@type": "Person",
      "name": trip.author,
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/author/${slugify(trip.author)}`
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Kurukshetra",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    },
    "datePublished": trip.publishDate,
    "dateModified": trip.updatedDate || trip.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/trip/${id}`
    },
    "articleSection": trip.category,
    "keywords": extractKeywords(trip.content).join(', '),
    "wordCount": trip.content.split(' ').length,
    "inLanguage": "en-IN",
    "isAccessibleForFree": true,
    "hasPart": trip.images?.map((img: any, index: any) => ({
      "@type": "ImageObject",
      "url": img.url,
      "caption": `${trip.title} - Image ${index + 1}`
    })) || []
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <div className="min-h-screen bg-white pb-16 md:pb-0">
        <Header />

        {/* Hero Image Section */}
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
          {trip.images && trip.images.length > 0 ? (
            <img
              src={trip.images[0].url}
              alt={trip.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-teal-400 to-teal-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <div className="inline-block px-4 py-1 bg-teal-600 text-white text-sm font-medium rounded-full mb-4">
                {trip.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {trip.title}
              </h1>
              {trip.shortDescription && (
                <p className="text-lg md:text-xl text-gray-200 max-w-3xl">
                  {trip.shortDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Trip Overview */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Trip Overview
                </h2>
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: trip.content || trip.description }}
                />
              </div>

              {/* Image Gallery */}
              {trip.images && trip.images.length > 1 && (
                <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {trip.images.slice(1).map((image: any, index: number) => (
                      <div key={index} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                        <img
                          src={image.url}
                          alt={`${trip.title} - Image ${index + 2}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Trip Details Card */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border border-teal-200 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Trip Details</h3>

                <div className="space-y-4">
                  {/* Author */}
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      {trip.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Organized by</p>
                      <p className="font-semibold text-gray-900">{trip.author}</p>
                    </div>
                  </div>

                  <div className="border-t border-teal-200 pt-4 space-y-3">
                    {/* Publish Date */}
                    <div>
                      <p className="text-sm text-gray-600">Trip Start Date</p>
                      <p className="font-medium text-gray-900">
                        {new Date(trip.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors">
                    Book This Trip
                  </button>

                  <button className="w-full bg-white hover:bg-gray-50 text-teal-600 font-semibold py-3 px-6 rounded-xl border-2 border-teal-600 transition-colors">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}