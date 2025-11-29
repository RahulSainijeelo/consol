import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Sarah Johnson",
        trip: "Italian Riviera Tour",
        rating: 5,
        comment: "The most amazing experience of my life! The guides were knowledgeable and the scenery was breathtaking.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
        id: 2,
        name: "Michael Chen",
        trip: "Safari in Kenya",
        rating: 5,
        comment: "Seeing the Big Five in their natural habitat was a dream come true. Everything was perfectly organized.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
    {
        id: 3,
        name: "Emily Davis",
        trip: "Iceland Northern Lights",
        rating: 4,
        comment: "Despite the cold, the views were worth it. The Northern Lights were spectacular!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 4,
        name: "David Wilson",
        trip: "Machu Picchu Trek",
        rating: 5,
        comment: "A challenging but rewarding trek. The support team was fantastic throughout the journey.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    },
];

export function PreviousTrips() {
    return (
        <section className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                        Memories from <span className="text-orange-500">Previous Trips</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
                        Hear from our happy travelers and see where we've been.
                    </p>
                </div>

                <div className="mx-auto max-w-5xl">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {testimonials.map((testimonial) => (
                                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card className="h-full border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                            <CardContent className="flex flex-col items-center p-6 text-center h-full">
                                                <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-orange-100">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                                                    {testimonial.name}
                                                </h3>
                                                <p className="mb-3 text-sm font-medium text-orange-600">
                                                    {testimonial.trip}
                                                </p>
                                                <div className="mb-4 flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < testimonial.rating
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "fill-gray-200 text-gray-200"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                    "{testimonial.comment}"
                                                </p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="hidden md:block">
                            <CarouselPrevious className="-left-12 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700" />
                            <CarouselNext className="-right-12 border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
