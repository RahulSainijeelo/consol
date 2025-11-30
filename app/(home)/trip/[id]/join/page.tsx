import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/firebase";
import JoinTripForm from "@/components/trips/JoinTripForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default async function JoinTripPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await currentUser();
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!user) {
        redirect(`/auth/login?redirect=/trip/${id}/join`);
    }

    // Fetch trip directly from Firestore
    const tripRef = db.collection("trips").doc(id);
    const tripDoc = await tripRef.get();

    if (!tripDoc.exists) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gold mb-4">Trip Not Found</h1>
                        <p className="text-gray-400">The trip you are looking for does not exist.</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const trip = tripDoc.data();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-gold mb-2">
                            Join Trip: {trip?.title}
                        </h1>
                        <p className="text-gray-400">
                            {trip?.destination} • {trip?.duration}
                        </p>
                    </div>

                    <JoinTripForm
                        tripId={id}
                        tripTitle={trip?.title || ""}
                        tripPrice={trip?.price || 0}
                        userEmail={user.emailAddresses[0]?.emailAddress}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
