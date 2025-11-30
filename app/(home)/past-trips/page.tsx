import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import BottomTabBar from '@/components/layout/BottomTabBar';

export const metadata: Metadata = {
    title: 'Past Trips - Consol Travel',
    description: 'Explore our completed trips and read reviews from happy travelers who have experienced amazing adventures with us.',
};

// Demo data for past trips
const pastTrips = [
    {
        id: "past-trip-001",
        title: "Amazing Iceland Northern Lights Expedition",
        shortDescription: "A magical journey through Iceland's winter wonderland, witnessing the spectacular Northern Lights.",
        category: "Adventure",
        completedDate: "2024-02-15",
        duration: "8 days",
        participants: 14,
        rating: 4.9,
        totalReviews: 12,
        image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "past-trip-002",
        title: "Machu Picchu & Sacred Valley Trek",
        shortDescription: "An incredible journey through Peru's ancient Incan sites and breathtaking mountain landscapes.",
        category: "Cultural",
        completedDate: "2024-01-20",
        duration: "10 days",
        participants: 16,
        rating: 4.8,
        totalReviews: 15,
        image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "past-trip-003",
        title: "Safari Adventure in Kenya",
        shortDescription: "Witness the Big Five in their natural habitat on this unforgettable African safari experience.",
        category: "Wildlife",
        completedDate: "2023-12-10",
        duration: "9 days",
        participants: 12,
        rating: 5.0,
        totalReviews: 10,
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "past-trip-004",
        title: "Japanese Cherry Blossom Tour",
        shortDescription: "Experience the beauty of Japan during cherry blossom season with visits to Kyoto, Tokyo, and Mount Fuji.",
        category: "Cultural",
        completedDate: "2023-11-25",
        duration: "12 days",
        participants: 18,
        rating: 4.7,
        totalReviews: 16,
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "past-trip-005",
        title: "Norwegian Fjords Cruise",
        shortDescription: "Sail through stunning Norwegian fjords with stops at charming coastal villages and dramatic landscapes.",
        category: "Cruise",
        completedDate: "2023-10-15",
        duration: "7 days",
        participants: 20,
        rating: 4.6,
        totalReviews: 18,
        image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: "past-trip-006",
        title: "Australian Outback Adventure",
        shortDescription: "Explore the rugged beauty of the Australian Outback, from Uluru to the Great Barrier Reef.",
        category: "Adventure",
        completedDate: "2023-09-20",
        duration: "11 days",
        participants: 15,
        rating: 4.9,
        totalReviews: 13,
        image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
];

export default function PastTripsPage() {
    return (
        <div className="min-h-screen bg-black pb-16 md:pb-0">
            <Header />

            {/* Hero Section */}
            <div className="text-white py-4">
                <div className="container mx-auto px-4 pt-3 md:pt-20">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl pl-20 sm:pl-0 lg:text-6xl font-display font-bold mb-6">
                            Past Trips
                        </h1>
                    </div>
                </div>
            </div>
            {/* Trips Grid */}
            <div className="container mx-auto px-4 pb-8">
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

                                {/* Trip Info */}
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
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gold" />
                                        <span>{trip.participants} travelers</span>
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
            </div>
            <BottomTabBar />

            <Footer />
        </div>
    );
}
