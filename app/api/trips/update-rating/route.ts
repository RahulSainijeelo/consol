import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { auth, currentUser } from '@clerk/nextjs/server';

// POST /api/trips/update-rating - Update trip rating when a review is approved
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const { isAuthenticated } = await auth();
        const user = await currentUser();

        if (!isAuthenticated) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { tripId, newRating } = body;

        if (!tripId || typeof newRating !== 'number') {
            return NextResponse.json(
                { error: "Trip ID and rating are required" },
                { status: 400 }
            );
        }

        if (newRating < 1 || newRating > 5) {
            return NextResponse.json(
                { error: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // Get trip reference
        const tripRef = db.collection("trips").doc(tripId);
        const tripDoc = await tripRef.get();

        if (!tripDoc.exists) {
            return NextResponse.json(
                { error: "Trip not found" },
                { status: 404 }
            );
        }

        const tripData = tripDoc.data();
        const currentRating = tripData?.rating || 0;
        const currentReviewCount = tripData?.reviewCount || 0;

        // Calculate new average rating
        const totalRating = (currentRating * currentReviewCount) + newRating;
        const newReviewCount = currentReviewCount + 1;
        const updatedRating = totalRating / newReviewCount;

        // Update trip with new rating
        await tripRef.update({
            rating: Math.round(updatedRating * 10) / 10, // Round to 1 decimal place
            reviewCount: newReviewCount,
            updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({
            message: "Trip rating updated successfully",
            data: {
                tripId,
                rating: Math.round(updatedRating * 10) / 10,
                reviewCount: newReviewCount,
            },
        });
    } catch (error) {
        console.error("Error updating trip rating:", error);
        return NextResponse.json(
            { error: "Failed to update trip rating" },
            { status: 500 }
        );
    }
}
