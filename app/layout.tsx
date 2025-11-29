import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import NextTopLoader from 'nextjs-toploader';
import Script from 'next/script';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: '--font-devanagari',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ea580c' },
    { media: '(prefers-color-scheme: dark)', color: '#ea580c' }
  ],
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kurukshetra.info'),

  title: {
    default: "Kurukshetra.info The Intellectual Battlefield for Bharat's Civilizational Future",
    template: "%s | Kurukshetra.info"
  },
  description: "Kurukshetra.info is the digital command post in the silent war for Bharat's soul. We provide unflinching analysis on Global, Bharat, Dharma, Politics, and History to arm the modern Intellectual Kshatriya.",

  keywords: [
    "Kurukshetra", "dharma", "truth", "authentic news", "Indian journalism",
    "dharmic values", "civilizational awakening", "Bharat", "Hindu dharma",
    "politics", "nation","bharat", "culture", "history", "spiritual journalism",
    "Rajiv Dixit", "truth movement", "anti-colonial", "indigenous knowledge",
    "Bharatiya values", "dharma yuddha", "righteous journalism"
  ],

  authors: [
    { name: "Kurukshetra Editorial Team" },
    { name: "Editorial Board" }
  ],
  creator: "Kurukshetra.info Media",
  publisher: "Kurukshetra.info Digital Media",

  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en-IN',
      'hi-IN': '/hi-IN',
    },
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    url: '/',
    title: "Kurukshetra.info The Intellectual Battlefield for Bharat's Civilizational Future",
    description: "Kurukshetra.info is the digital command post in the silent war for Bharat's soul. We provide unflinching analysis on Global, Bharat, Dharma, Politics, and History to arm the modern Intellectual Kshatriya.",
    siteName: 'Kurukshetra.info',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kurukshetra - Dharmic Journalism',
        type: 'image/jpeg',
      },
      {
        url: '/og-image-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'Kurukshetra Logo',
        type: 'image/jpeg',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@kurukshetra',
    creator: '@kurukshetra',
    title: "Kurukshetra.info The Intellectual Battlefield for Bharat's Civilizational Future",
    description: "Kurukshetra.info is the digital command post in the silent war for Bharat's soul. We provide unflinching analysis on Global, Bharat, Dharma, Politics, and History to arm the modern Intellectual Kshatriya.",
    images: ['/twitter-image.jpg'],
  },

  // App-specific
  applicationName: 'Kurukshetra.info',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Kurukshetra.info',
  },

  // Verification
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
    yandex: process.env.YANDEX_VERIFICATION_ID,
    other: {
      'facebook-domain-verification': process.env.FACEBOOK_VERIFICATION_ID || '',
      'pinterest-site-verification': process.env.PINTEREST_VERIFICATION_ID || '',
    },
  },

  // Additional metadata
  category: 'news',
  classification: 'News and Media',

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'google-site-verification': process.env.GOOGLE_VERIFICATION_ID || '',
    'msvalidate.01': process.env.BING_VERIFICATION_ID || '',
    'yandex-verification': process.env.YANDEX_VERIFICATION_ID || '',
    'p:domain_verify': process.env.PINTEREST_VERIFICATION_ID || '',
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "name": "Kurukshetra.info",
    "alternateName": "Kurukshetra Digital Media",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://kurukshetra.info",
    "logo": {
      "@type": "ImageObject",
      "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      "width": 512,
      "height": 512
    },
    "description": "Kurukshetra.info is the digital command post in the silent war for Bharat's soul. We provide unflinching analysis on Global, Bharat, Dharma, Politics, and History to arm the modern Intellectual Kshatriya.",
    "foundingDate": "2025",
    "founder": {
      "@type": "Person",
      "name": "Kurukshetra Editorial Team"
    },
    "sameAs": [
      "https://x.com/KURUKSHETRA108?t=-cOx8DWUZF3Oab9z5HNv2g&s=08",
      "https://www.facebook.com/share/15x8YKAjA5/",
      "https://www.instagram.com/kurukshetra108?igsh=MTIxNGtrbGJmaHhkbA==",
      "https://youtube.com/@kuruksetra?si=Zsc_6dA1w_6wnwbB"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXX-XXXXXX",
      "contactType": "Editorial",
      "email": "kurukshetra5751@gmail.com"
    },
    "publishingPrinciples": `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    "diversityPolicy": `${process.env.NEXT_PUBLIC_SITE_URL}/diversity-policy`,
    "ethicsPolicy": `${process.env.NEXT_PUBLIC_SITE_URL}/ethics-policy`
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kurukshetra.info",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://kurukshetra.info",
    "description": "Kurukshetra.info is the digital command post in the silent war for Bharat's soul. We provide unflinching analysis on Global, Bharat, Dharma, Politics, and History to arm the modern Intellectual Kshatriya.",
    "inLanguage": ["en-IN", "hi-IN"],
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "Kurukshetra.info",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
      }
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${notoSansDevanagari.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://platform.twitter.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        
        {/* Manifest and PWA */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ea580c" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Structured Data - Organization */}
        <JsonLd data={organizationJsonLd} />
        
        {/* Structured Data - Website */}
        <JsonLd data={websiteJsonLd} />
        
        {/* Google Analytics */}
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader showSpinner={false}/>
        
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-orange-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClerkProvider>
            <div id="main-content">
              {children}
            </div>
          </ClerkProvider>
          <Toaster />
        </ThemeProvider>

        {/* Google AdSense - Load after hydration */}
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5404939334049607"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
