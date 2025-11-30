import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Star, Calendar, Users, MapPin, Quote } from 'lucide-react';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface PrevTripPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Demo data for previous trip
const demoPrevTrip = {
    id: "prev-trip-001",
    title: "Amazing Iceland Northern Lights Expedition",
    shortDescription: "A magical journey through Iceland's winter wonderland, witnessing the spectacular Northern Lights and exploring breathtaking landscapes.",
    category: "Adventure",
    completedDate: "2024-02-15",
    duration: "8 days, 7 nights",
    participants: 14,
    rating: 4.9,
    totalReviews: 12,
    images: [
        {
            url: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            caption: "Northern Lights over Iceland"
        },
        {
            url: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            caption: "Blue Lagoon geothermal spa"
        },
        {
            url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            caption: "Jökulsárlón Glacier Lagoon"
        },
        {
            url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            caption: "Skógafoss Waterfall"
        }
    ],
    highlights: [
        "Witnessed spectacular Northern Lights on 5 out of 8 nights",
        "Explored the Golden Circle including Þingvellir National Park",
        "Relaxed in the famous Blue Lagoon geothermal spa",
        "Visited stunning waterfalls: Skógafoss and Seljalandsfoss",
        "Explored ice caves and glacier hiking",
        "Experienced authentic Icelandic cuisine and culture"
    ],
    reviews: [
        {
            id: 1,
            name: "Emily Rodriguez",
            date: "2024-02-20",
            rating: 5,
            comment: "This was absolutely the trip of a lifetime! The Northern Lights were beyond magical, and our guide was incredibly knowledgeable. Every moment was perfectly planned, from the ice cave exploration to the cozy evenings in traditional Icelandic lodges. Highly recommend!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tripImages: [
                "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            id: 2,
            name: "Michael Chen",
            date: "2024-02-19",
            rating: 5,
            comment: "Iceland exceeded all expectations! The landscapes are otherworldly, and seeing the Aurora Borealis dance across the sky was surreal. The group was amazing, and the accommodations were top-notch. Worth every penny!",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tripImages: []
        },
        {
            id: 3,
            name: "Sarah Thompson",
            date: "2024-02-18",
            rating: 5,
            comment: "An unforgettable adventure! From glacier hiking to soaking in hot springs under the stars, every day brought new wonders. The Northern Lights were spectacular, and the photography opportunities were endless.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tripImages: [
                "https://images.unsplash.com/photo-1504829857797-ddff29c27927?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        },
        {
            id: 4,
            name: "David Kumar",
            date: "2024-02-17",
            rating: 4,
            comment: "Fantastic trip overall! The itinerary was well-balanced with adventure and relaxation. Only minor complaint was the weather on day 3, but that's Iceland for you! The Northern Lights made up for everything.",
            image: null,
            tripImages: []
        },
        {
            id: 5,
            name: "Jessica Martinez",
            date: "2024-02-16",
            rating: 5,
            comment: "This trip was pure magic! The combination of natural wonders, cultural experiences, and the incredible Northern Lights created memories I'll cherish forever. Our guide's passion for Iceland was contagious!",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            tripImages: [
                "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    ]
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    return {
        title: `${demoPrevTrip.title} - Previous Trip`,
        description: demoPrevTrip.shortDescription,
    };
}

export default async function PrevTripPage({ params }: PrevTripPageProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const trip = demoPrevTrip;

    if (!trip) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black pb-16 md:pb-0">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={trip.images[0].url}
                    alt={trip.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Completed Badge */}
                <div className="absolute top-6 left-6 md:top-12 md:left-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/80 backdrop-blur-sm text-green-100 text-sm font-semibold rounded-full border border-green-500/30">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Completed Trip
                    </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <div className="inline-block px-4 py-1 bg-gold text-black text-sm font-medium rounded-full mb-4">
                            {trip.category}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                            {trip.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-4">
                            {trip.shortDescription}
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                                <Star className="w-5 h-5 fill-gold text-gold" />
                                <span className="text-white font-semibold">{trip.rating} / 5.0</span>
                                <span className="text-gray-400">({trip.totalReviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/10">
                                <Users className="w-5 h-5" />
                                <span>{trip.participants} travelers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Trip Highlights */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                Trip Highlights
                            </h2>
                            <ul className="space-y-3">
                                {trip.highlights.map((highlight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                                            <div className="w-2 h-2 bg-gold rounded-full"></div>
                                        </div>
                                        <span className="text-gray-300 leading-relaxed">{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Photo Gallery */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                Photo Gallery
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {trip.images.map((image, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                                        <img
                                            src={image.url}
                                            alt={image.caption}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Traveler Reviews
                                </h2>
                                <div className="flex items-center gap-2">
                                    <Star className="w-6 h-6 fill-gold text-gold" />
                                    <span className="text-2xl font-bold text-white">{trip.rating}</span>
                                    <span className="text-gray-400">/ 5.0</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {trip.reviews.map((review) => (
                                    <div key={review.id} className="border-b border-white/10 last:border-0 pb-6 last:pb-0">
                                        <div className="flex items-start gap-4">
                                            {/* Avatar */}
                                            <div className="flex-shrink-0">
                                                {review.image ? (
                                                    <img
                                                        src={review.image}
                                                        alt={review.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center text-black font-bold">
                                                        {review.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Review Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-semibold text-white">{review.name}</h4>
                                                        <p className="text-sm text-gray-400">
                                                            {new Date(review.date).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < review.rating
                                                                    ? 'fill-gold text-gold'
                                                                    : 'fill-gray-700 text-gray-700'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="relative">
                                                    <Quote className="absolute -left-1 -top-1 w-6 h-6 text-gold/20" />
                                                    <p className="text-gray-300 leading-relaxed pl-6">{review.comment}</p>
                                                </div>

                                                {/* Review Images */}
                                                {review.tripImages && review.tripImages.length > 0 && (
                                                    <div className="mt-4 flex gap-2">
                                                        {review.tripImages.map((img, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={img}
                                                                alt={`Review image ${idx + 1}`}
                                                                className="w-24 h-24 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Trip Info Card */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Trip Information</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Completed On</p>
                                        <p className="font-semibold text-white">
                                            {new Date(trip.completedDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Duration</p>
                                        <p className="font-semibold text-white">{trip.duration}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Participants</p>
                                        <p className="font-semibold text-white">{trip.participants} travelers</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Star className="w-5 h-5 text-gold mt-0.5 fill-gold" />
                                    <div>
                                        <p className="text-sm text-gray-400">Average Rating</p>
                                        <p className="font-semibold text-white">{trip.rating} / 5.0</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-sm text-gray-400 mb-4">Interested in a similar trip?</p>
                                <button className="w-full bg-gold hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors">
                                    View Upcoming Trips
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomTabBar />

            <Footer />
        </div>
    );
}
