import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative h-[80vh] w-full overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
                    alt="Travel Background"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
                <h1 className="mb-6 text-4xl font-display font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Discover Your Next <span className="text-gold">Adventure</span>
                </h1>
                <p className="mb-8 max-w-2xl text-lg text-gray-200 sm:text-xl">
                    Explore the world's most breathtaking destinations with our curated travel experiences.
                    Your journey begins here.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" className="bg-gold hover:bg-yellow-600 text-black font-semibold border-none text-lg px-8 py-6">
                        Explore Trips
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 hover:text-gold hover:border-gold text-lg px-8 py-6">
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
}
