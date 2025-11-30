import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
    Calendar,
    MapPin,
    Users,
    CreditCard,
    CheckCircle2,
    Clock,
    Mail,
    Phone,
    Download,
    AlertCircle,
    Plane,
    Hotel,
    Utensils
} from 'lucide-react';
import BottomTabBar from '@/components/layout/BottomTabBar';

interface MyTripPageProps {
    params: Promise<{
        id: string;
    }>;
}

// Demo data for my trip
const demoMyTrip = {
    id: "my-trip-001",
    bookingReference: "BK-2024-001234",
    status: "confirmed",
    trip: {
        title: "Magical Bali Island Adventure",
        destination: "Bali, Indonesia",
        startDate: "2024-04-15",
        endDate: "2024-04-22",
        duration: "7 days, 6 nights",
        category: "Adventure",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    travelerInfo: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        numberOfTravelers: 2,
        specialRequests: "Vegetarian meals, window seats preferred"
    },
    payment: {
        totalAmount: 2598,
        currency: "USD",
        paidAmount: 2598,
        paymentStatus: "paid",
        paymentMethod: "Credit Card (****4242)",
        paymentDate: "2024-03-01",
        breakdown: [
            { item: "Trip Cost (2 travelers)", amount: 2398 },
            { item: "Travel Insurance", amount: 150 },
            { item: "Service Fee", amount: 50 }
        ]
    },
    itinerary: [
        {
            day: 1,
            title: "Arrival in Denpasar",
            activities: ["Airport pickup", "Hotel check-in", "Welcome dinner", "Beach sunset walk"]
        },
        {
            day: 2,
            title: "Tanah Lot & Rice Terraces",
            activities: ["Visit Tanah Lot Temple", "Jatiluwih Rice Terraces", "Traditional Balinese lunch", "Cultural dance performance"]
        },
        {
            day: 3,
            title: "Ubud Exploration",
            activities: ["Sacred Monkey Forest", "Ubud Art Market", "Tegalalang Rice Terraces", "Coffee plantation tour"]
        }
    ],
    inclusions: [
        { icon: Hotel, text: "6 nights accommodation in 4-star hotels" },
        { icon: Utensils, text: "Daily breakfast and 3 traditional dinners" },
        { icon: Plane, text: "Airport transfers and all transportation" },
        { icon: Users, text: "Professional English-speaking guide" }
    ],
    documents: [
        { name: "Booking Confirmation", type: "PDF", size: "245 KB" },
        { name: "Travel Itinerary", type: "PDF", size: "512 KB" },
        { name: "Travel Insurance", type: "PDF", size: "189 KB" }
    ]
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    return {
        title: `${demoMyTrip.trip.title} - My Trip`,
        description: 'View your trip details, payment information, and itinerary.',
    };
}

export default async function MyTripDetailPage({ params }: MyTripPageProps) {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const myTrip = demoMyTrip;

    if (!myTrip) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black pb-16 md:pb-0">
            <Header />

            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <img
                    src={myTrip.trip.image}
                    alt={myTrip.trip.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-6 left-6 md:top-12 md:left-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-full">
                        <CheckCircle2 className="w-4 h-4" />
                        Confirmed
                    </div>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <p className="text-gold text-sm font-semibold mb-2">
                            Booking Reference: {myTrip.bookingReference}
                        </p>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                            {myTrip.trip.title}
                        </h1>
                        <div className="flex items-center gap-4 text-white">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{myTrip.trip.destination}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{myTrip.trip.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Trip Details Card */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Trip Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Start Date</p>
                                        <p className="font-semibold text-white">
                                            {new Date(myTrip.trip.startDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Calendar className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">End Date</p>
                                        <p className="font-semibold text-white">
                                            {new Date(myTrip.trip.endDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Number of Travelers</p>
                                        <p className="font-semibold text-white">{myTrip.travelerInfo.numberOfTravelers} travelers</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Clock className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Duration</p>
                                        <p className="font-semibold text-white">{myTrip.trip.duration}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Traveler Information */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Traveler Information</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Primary Contact</p>
                                        <p className="font-semibold text-white">{myTrip.travelerInfo.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Email</p>
                                        <p className="font-semibold text-white">{myTrip.travelerInfo.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-gold mt-0.5" />
                                    <div>
                                        <p className="text-sm text-gray-400">Phone</p>
                                        <p className="font-semibold text-white">{myTrip.travelerInfo.phone}</p>
                                    </div>
                                </div>

                                {myTrip.travelerInfo.specialRequests && (
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-gold mt-0.5" />
                                        <div>
                                            <p className="text-sm text-gray-400">Special Requests</p>
                                            <p className="font-semibold text-white">{myTrip.travelerInfo.specialRequests}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* What's Included */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">What's Included</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {myTrip.inclusions.map((inclusion, index) => {
                                    const Icon = inclusion.icon;
                                    return (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-gold" />
                                            </div>
                                            <span className="text-gray-300 leading-relaxed mt-1">{inclusion.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sample Itinerary */}
                        <div className="bg-white/5 rounded-2xl border border-white/10 p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Sample Itinerary</h2>

                            <div className="space-y-6">
                                {myTrip.itinerary.map((day) => (
                                    <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-white/10 last:border-0 last:pb-0">
                                        <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gold rounded-full border-4 border-black"></div>
                                        <div className="mb-2">
                                            <span className="text-sm font-semibold text-gold">Day {day.day}</span>
                                            <h3 className="text-lg font-bold text-white">{day.title}</h3>
                                        </div>
                                        <ul className="space-y-1">
                                            {day.activities.map((activity, idx) => (
                                                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                                                    <span className="text-gold mt-1">•</span>
                                                    <span>{activity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Payment Information */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6">Payment Information</h3>

                            <div className="space-y-4">
                                {/* Payment Status */}
                                <div className="flex items-center justify-between p-3 bg-green-900/30 border border-green-500/30 rounded-lg">
                                    <span className="text-sm font-medium text-gray-300">Status</span>
                                    <span className="flex items-center gap-2 text-green-400 font-semibold">
                                        <CheckCircle2 className="w-4 h-4" />
                                        Paid in Full
                                    </span>
                                </div>

                                {/* Payment Breakdown */}
                                <div className="space-y-2 pt-4 border-t border-white/10">
                                    {myTrip.payment.breakdown.map((item, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-400">{item.item}</span>
                                            <span className="font-medium text-white">${item.amount}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="flex justify-between pt-4 border-t-2 border-gold/50">
                                    <span className="font-bold text-white">Total Amount</span>
                                    <span className="font-bold text-xl text-gold">
                                        ${myTrip.payment.totalAmount}
                                    </span>
                                </div>

                                {/* Payment Details */}
                                <div className="pt-4 border-t border-white/10 space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <CreditCard className="w-4 h-4" />
                                        <span>{myTrip.payment.paymentMethod}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            Paid on {new Date(myTrip.payment.paymentDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-4">Documents</h3>

                            <div className="space-y-3">
                                {myTrip.documents.map((doc, index) => (
                                    <button
                                        key={index}
                                        className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors group border border-white/5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                                                <Download className="w-5 h-5 text-gold" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-sm font-semibold text-white">{doc.name}</p>
                                                <p className="text-xs text-gray-400">{doc.type} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <Download className="w-4 h-4 text-gray-500 group-hover:text-gold transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Need Help */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-2">Need Help?</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Our support team is here to assist you with any questions.
                            </p>
                            <button className="w-full bg-gold hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <BottomTabBar />

            <Footer />
        </div>
    );
}
