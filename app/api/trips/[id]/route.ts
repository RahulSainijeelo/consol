import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";

// GET /api/trips/[id] - Get a single trip by ID
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Trip ID is required" },
                { status: 400 }
            );
        }

        // Fetch trip from Firestore
        const tripRef = db.collection("trips").doc(id);
        const tripDoc = await tripRef.get();

        if (!tripDoc.exists) {
            return NextResponse.json(
                { error: "Trip not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: tripDoc.id,
            ...tripDoc.data(),
        });
    } catch (error) {
        console.error("Error fetching trip:", error);
        return NextResponse.json(
            { error: "Failed to fetch trip" },
            { status: 500 }
        );
    }
}
