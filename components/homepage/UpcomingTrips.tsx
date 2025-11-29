import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const trips = [
    {
        id: 1,
        title: "Bali Island Escape",
        location: "Bali, Indonesia",
        date: "April 15 - 22, 2024",
        duration: "7 Days",
        price: "$1,299",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1038&q=80",
        description: "Experience the magic of Bali with pristine beaches, lush rice terraces, and vibrant culture.",
    },
    {
        id: 2,
        title: "Swiss Alps Adventure",
        location: "Zermatt, Switzerland",
        date: "May 10 - 17, 2024",
        duration: "8 Days",
        price: "$2,499",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Hiking, skiing, and breathtaking views in the heart of the Swiss Alps.",
    },
    {
        id: 3,
        title: "Kyoto Cherry Blossoms",
        location: "Kyoto, Japan",
        date: "March 25 - April 2, 2024",
        duration: "9 Days",
        price: "$3,199",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        description: "Witness the stunning cherry blossom season in the historic city of Kyoto.",
    },
];

export function UpcomingTrips() {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Upcoming <span className="text-teal-600">Trips</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                        Join us on our next adventures. Limited spots available for these exclusive experiences.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {trips.map((trip) => (
                        <Card key={trip.id} className="overflow-hidden border-none shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={trip.image}
                                    alt={trip.title}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-bold text-teal-600 shadow-sm backdrop-blur-sm">
                                    {trip.price}
                                </div>
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <MapPin className="mr-1 h-4 w-4 text-teal-600" />
                                        {trip.location}
                                    </div>
                                </div>
                                <CardTitle className="text-xl font-bold mt-2">{trip.title}</CardTitle>
                                <CardDescription className="line-clamp-2 mt-2">
                                    {trip.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        {trip.date}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4" />
                                        {trip.duration}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button variant="outline" size="lg" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                        View All Destinations
                    </Button>
                </div>
            </div>
        </section>
    );
}
