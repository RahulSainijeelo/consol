"use client";

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, Calendar, Users, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import BottomTabBar from '@/components/layout/BottomTabBar';

// Demo data for upcoming trips
const upcomingTrips = [
    {
        id: "trip-001",
        title: "Magical Bali Island Adventure",
        shortDescription: "Experience the enchanting beauty of Bali with pristine beaches and ancient temples.",
        category: "Adventure",
        startDate: "2024-04-15",
        duration: "7 days",
        participants: 12,
        spotsLeft: 3,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "trip-002",
        title: "Swiss Alps Hiking Expedition",
        shortDescription: "Trek through stunning alpine landscapes and charming Swiss villages.",
        category: "Adventure",
        startDate: "2024-05-20",
        duration: "10 days",
        participants: 15,
        spotsLeft: 5,
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "trip-003",
        title: "Santorini Sunset Experience",
        shortDescription: "Discover the magic of Greece's most romantic island with stunning sunsets.",
        category: "Relaxation",
        startDate: "2024-06-10",
        duration: "6 days",
        participants: 10,
        spotsLeft: 2,
        image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
];

// Demo data for past trips
const pastTrips = [
    {
        id: "past-trip-001",
        title: "Amazing Iceland Northern Lights",
        shortDescription: "A magical journey through Iceland's winter wonderland.",
        category: "Adventure",
        completedDate: "2024-02-15",
        duration: "8 days",
        rating: 4.9,
        totalReviews: 12,
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "past-trip-002",
        title: "Machu Picchu Trek",
        shortDescription: "An incredible journey through Peru's ancient Incan sites.",
        category: "Cultural",
        completedDate: "2024-01-20",
        duration: "10 days",
        rating: 4.8,
        totalReviews: 15,
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
];

export default function MyTripsPage() {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    return (
        <div className="min-h-screen bg-black pb-16 md:pb-0">
            <Header />

            {/* Hero Section */}
            <div className="text-white py-6 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                            My Trips
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400">
                            Manage your upcoming adventures and revisit your past journeys.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-black/95 border-b border-white/10 sticky top-16 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/60">
                <div className="container mx-auto px-4">
                    <div className="flex gap-8">
                        <button
                            onClick={() => setActiveTab('upcoming')}
                            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${activeTab === 'upcoming'
                                ? 'border-gold text-gold'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            Upcoming Trips
                            <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded-full ${activeTab === 'upcoming' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-gray-400'}`}>
                                {upcomingTrips.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`py-4 px-2 font-semibold border-b-2 transition-colors ${activeTab === 'past'
                                ? 'border-gold text-gold'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            Past Trips
                            <span className={`ml-2 px-2 py-0.5 text-xs font-bold rounded-full ${activeTab === 'past' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-gray-400'}`}>
                                {pastTrips.length}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Upcoming Trips */}
                {activeTab === 'upcoming' && (
                    <div>
                        {upcomingTrips.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {upcomingTrips.map((trip) => (
                                    <Card key={trip.id} className="overflow-hidden border-white/10 bg-white/5 shadow-lg hover:shadow-gold/20 transition-shadow group">
                                        {/* Trip Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={trip.image}
                                                alt={trip.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-black text-xs font-semibold rounded-full flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                Upcoming
                                            </div>
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-gold text-xs font-semibold rounded-full border border-gold/20">
                                                {trip.category}
                                            </div>
                                            {trip.spotsLeft <= 3 && (
                                                <div className="absolute bottom-4 right-4 px-3 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full">
                                                    Only {trip.spotsLeft} spots left!
                                                </div>
                                            )}
                                        </div>

                                        <CardHeader className="pb-3">
                                            <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-gold transition-colors">
                                                {trip.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 line-clamp-2 mt-2">
                                                {trip.shortDescription}
                                            </p>
                                        </CardHeader>

                                        <CardContent className="pb-3">
                                            <div className="space-y-2 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gold" />
                                                    <span>
                                                        Starts {new Date(trip.startDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-gold" />
                                                    <span>{trip.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gold" />
                                                    <span>{trip.participants} travelers</span>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter>
                                            <Link href={`/trip/${trip.id}`} className="w-full">
                                                <button className="w-full bg-gold hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                                                    View Trip Details
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                    <Calendar className="w-12 h-12 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No Upcoming Trips</h3>
                                <p className="text-gray-400 mb-6">Start planning your next adventure!</p>
                                <Link href="/">
                                    <button className="bg-gold hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors">
                                        Explore Trips
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Past Trips */}
                {activeTab === 'past' && (
                    <div>
                        {pastTrips.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {pastTrips.map((trip) => (
                                    <Card key={trip.id} className="overflow-hidden border-white/10 bg-white/5 shadow-lg hover:shadow-gold/20 transition-shadow group">
                                        {/* Trip Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={trip.image}
                                                alt={trip.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-green-900/80 backdrop-blur-sm text-green-100 text-xs font-semibold rounded-full flex items-center gap-1 border border-green-500/30">
                                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                                Completed
                                            </div>
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-gold text-xs font-semibold rounded-full border border-gold/20">
                                                {trip.category}
                                            </div>
                                        </div>

                                        <CardHeader className="pb-3">
                                            <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-gold transition-colors">
                                                {trip.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 line-clamp-2 mt-2">
                                                {trip.shortDescription}
                                            </p>
                                        </CardHeader>

                                        <CardContent className="pb-3">
                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.floor(trip.rating)
                                                                ? 'fill-gold text-gold'
                                                                : 'fill-gray-700 text-gray-700'
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-semibold text-white">{trip.rating}</span>
                                                <span className="text-sm text-gray-500">({trip.totalReviews} reviews)</span>
                                            </div>

                                            <div className="space-y-2 text-sm text-gray-400">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gold" />
                                                    <span>
                                                        {new Date(trip.completedDate).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-gold" />
                                                    <span>{trip.duration}</span>
                                                </div>
                                            </div>
                                        </CardContent>

                                        <CardFooter>
                                            <Link href={`/past-trips/${trip.id}`} className="w-full">
                                                <button className="w-full bg-gold hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                                                    View Details & Reviews
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                    <MapPin className="w-12 h-12 text-gray-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No Past Trips</h3>
                                <p className="text-gray-400 mb-6">Your travel history will appear here.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <BottomTabBar />

            <Footer />
        </div>
    );
}
