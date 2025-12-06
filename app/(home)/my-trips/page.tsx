"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, Calendar, Users, MapPin, ArrowRight, Clock, LogIn } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import BottomTabBar from '@/components/layout/BottomTabBar';
import LoginTC from '@/components/auth/LoginTC';

interface Trip {
    id: string;
    title: string;
    destination: string;
    category: string;
    description: string;
    images: { url: string }[];
    startDate: string;
    endDate: string;
    duration?: string;
    maxParticipants: number;
    currentParticipants?: number;
    rating?: number;
    reviewCount?: number;
}

interface Booking {
    id: string;
    tripId: string;
    status: string;
    createdAt: string;
    trip: Trip;
}

export default function MyTripsPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [upcomingTrips, setUpcomingTrips] = useState<Booking[]>([]);
    const [pastTrips, setPastTrips] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastFetch, setLastFetch] = useState<{ upcoming: number; past: number }>({
        upcoming: 0,
        past: 0
    });

    // Fetch trips with 2-minute cache
    const fetchTrips = async (type: 'upcoming' | 'past') => {
        const now = Date.now();
        const cacheTime = 2 * 60 * 1000; // 2 minutes in milliseconds

        // Check if we have recent data (within 2 minutes)
        if (lastFetch[type] && (now - lastFetch[type]) < cacheTime) {
            return; // Use cached data
        }

        try {
            setLoading(true);
            const response = await fetch(`/api/user/bookings?type=${type}`);

            if (!response.ok) {
                throw new Error('Failed to fetch trips');
            }

            const result = await response.json();

            if (type === 'upcoming') {
                setUpcomingTrips(result.data || []);
                setLastFetch(prev => ({ ...prev, upcoming: now }));
            } else {
                setPastTrips(result.data || []);
                setLastFetch(prev => ({ ...prev, past: now }));
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when tab changes
    useEffect(() => {
        if (status === 'authenticated') {
            fetchTrips(activeTab);
        }
    }, [activeTab, status]);

    // Initial load
    useEffect(() => {
        if (status === 'authenticated') {
            setLoading(false);
        } else if (status === 'unauthenticated') {
            setLoading(false);
        }
    }, [status]);

    // Show login prompt if not authenticated
    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-black pb-16 md:pb-0">
                <Header />
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading your trips...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return <LoginTC />;
    }

    const currentTrips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

    return (
        <div className="min-h-screen bg-black pb-16 md:pb-0">
            <Header />

            {/* Hero Section */}
            <div className="text-white py-6 md:py-8">
                <div className="container mx-auto px-4 pt-3 md:pt-20">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 pl-20 sm:pl-0">
                            My Trips
                        </h1>
                        <p className="text-lg md:text-xl text-gray-400">
                            Manage your upcoming adventures and revisit your past journeys.
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-black/95 border-b border-white/10 sticky top-7 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/60">
                <div className="container mx-auto px-4">
                    <div className="flex gap-5 justify-end md:justify-center">
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
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-400">Loading trips...</p>
                    </div>
                ) : (
                    <>
                        {/* Upcoming Trips */}
                        {activeTab === 'upcoming' && (
                            <div>
                                {currentTrips.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {currentTrips.map((booking) => {
                                            const trip = booking.trip;
                                            const spotsLeft = trip.maxParticipants - (trip.currentParticipants || 0);

                                            return (
                                                <Card key={booking.id} className="overflow-hidden border-white/10 bg-white/5 shadow-lg hover:shadow-gold/20 transition-shadow group">
                                                    {/* Trip Image */}
                                                    <div className="relative h-64 overflow-hidden">
                                                        {trip.images && trip.images.length > 0 ? (
                                                            <img
                                                                src={trip.images[0].url}
                                                                alt={trip.title}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900" />
                                                        )}
                                                        <div className="absolute top-4 right-4 px-3 py-1 bg-gold text-black text-xs font-semibold rounded-full flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            Upcoming
                                                        </div>
                                                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm text-gold text-xs font-semibold rounded-full border border-gold/20">
                                                            {trip.category}
                                                        </div>
                                                        {spotsLeft <= 3 && spotsLeft > 0 && (
                                                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-red-500/90 text-white text-xs font-semibold rounded-full">
                                                                Only {spotsLeft} spots left!
                                                            </div>
                                                        )}
                                                    </div>

                                                    <CardHeader className="pb-3">
                                                        <h3 className="text-xl font-bold text-white line-clamp-2 group-hover:text-gold transition-colors">
                                                            {trip.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-400 line-clamp-2 mt-2">
                                                            {trip.description}
                                                        </p>
                                                    </CardHeader>

                                                    <CardContent className="pb-3">
                                                        <div className="space-y-2 text-sm text-gray-400">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-gold" />
                                                                <span>{trip.destination}</span>
                                                            </div>
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
                                                            {trip.duration && (
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-gold" />
                                                                    <span>{trip.duration}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-2">
                                                                <Users className="w-4 h-4 text-gold" />
                                                                <span>{trip.currentParticipants || 0} / {trip.maxParticipants} travelers</span>
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
                                            );
                                        })}
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
                                {currentTrips.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {currentTrips.map((booking) => {
                                            const trip = booking.trip;

                                            return (
                                                <Card key={booking.id} className="overflow-hidden border-white/10 bg-white/5 shadow-lg hover:shadow-gold/20 transition-shadow group">
                                                    {/* Trip Image */}
                                                    <div className="relative h-64 overflow-hidden">
                                                        {trip.images && trip.images.length > 0 ? (
                                                            <img
                                                                src={trip.images[0].url}
                                                                alt={trip.title}
                                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900" />
                                                        )}
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
                                                            {trip.description}
                                                        </p>
                                                    </CardHeader>

                                                    <CardContent className="pb-3">
                                                        {/* Rating */}
                                                        {trip.rating !== undefined && trip.rating > 0 && (
                                                            <div className="flex items-center gap-2 mb-4">
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`w-4 h-4 ${i < Math.floor(trip.rating!)
                                                                                ? 'fill-gold text-gold'
                                                                                : 'fill-gray-700 text-gray-700'
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-sm font-semibold text-white">{trip.rating.toFixed(1)}</span>
                                                                <span className="text-sm text-gray-500">({trip.reviewCount || 0} reviews)</span>
                                                            </div>
                                                        )}

                                                        <div className="space-y-2 text-sm text-gray-400">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="w-4 h-4 text-gold" />
                                                                <span>{trip.destination}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="w-4 h-4 text-gold" />
                                                                <span>
                                                                    Completed: {new Date(trip.endDate).toLocaleDateString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'short',
                                                                        day: 'numeric'
                                                                    })}
                                                                </span>
                                                            </div>
                                                            {trip.duration && (
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="w-4 h-4 text-gold" />
                                                                    <span>{trip.duration}</span>
                                                                </div>
                                                            )}
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
                                            );
                                        })}
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
                    </>
                )}
            </div>
            <BottomTabBar />

            <Footer />
        </div>
    );
}
