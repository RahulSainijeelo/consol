import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";
import {
    createTripSchema,
    updateTripSchema,
    deleteTripSchema,
    listTripsSchema,
} from "@/lib/validations/trip";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { auth, currentUser } from '@clerk/nextjs/server';
// GET /api/trips - List all trips with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Validate query parameters
        const queryResult = listTripsSchema.safeParse({
            category: searchParams.get("category") || undefined,
            status: searchParams.get("status") || undefined,
            page: searchParams.get("page") || undefined,
            limit: searchParams.get("limit") || undefined,
            featured: searchParams.get("featured") || undefined,
        });

        if (!queryResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: queryResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { category, status, page, limit, featured } = queryResult.data;

        // Get 'completed' parameter (for past trips)
        const completed = searchParams.get("completed") === "true";

        // Build Firestore query
        let query = db.collection("trips").orderBy("createdAt", "desc");

        // Apply filters
        if (category) {
            query = query.where("category", "==", category) as any;
        }
        if (status) {
            query = query.where("status", "==", status) as any;
        }
        if (featured !== undefined) {
            query = query.where("featured", "==", featured) as any;
        }

        // Filter for completed trips (past endDate)
        if (completed) {
            query = query.where("completed", "==", true) as any;
        } else {
            query = query.where("completed", "==", false) as any;
        }

        // Execute query
        const snapshot = await query.get();

        // Map documents to array
        const trips = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedTrips = trips.slice(startIndex, endIndex);

        return NextResponse.json({
            data: paginatedTrips,
            pagination: {
                page,
                limit,
                total: trips.length,
                totalPages: Math.ceil(trips.length / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching trips:", error);
        return NextResponse.json(
            { error: "Failed to fetch trips" },
            { status: 500 }
        );
    }
}

// POST /api/trips - Create a new trip
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const { isAuthenticated } = await auth();
        const user = await currentUser()
        if (!isAuthenticated) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate request body
        const validationResult = createTripSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const tripData = validationResult.data;

        // Add metadata
        const newTrip = {
            ...tripData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            currentParticipants: 0,
            featured: false,
            rating: 0,
            reviewCount: 0,
            author: user?.emailAddresses?.[0]?.emailAddress || "unknown",
        };

        // Save to Firestore
        const docRef = await db.collection("trips").add(newTrip);

        return NextResponse.json(
            {
                message: "Trip created successfully",
                id: docRef.id,
                data: { id: docRef.id, ...newTrip },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating trip:", error);
        return NextResponse.json(
            { error: "Failed to create trip" },
            { status: 500 }
        );
    }
}

// PUT /api/trips - Update an existing trip
export async function PUT(request: NextRequest) {
    try {
        // Check authentication
        const { isAuthenticated } = await auth();
        const user = await currentUser()
        if (!isAuthenticated) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }


        const body = await request.json();

        // Validate request body
        const validationResult = updateTripSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { id, ...updateData } = validationResult.data;

        // Check if trip exists
        const tripRef = db.collection("trips").doc(id);
        const tripDoc = await tripRef.get();

        if (!tripDoc.exists) {
            return NextResponse.json(
                { error: "Trip not found" },
                { status: 404 }
            );
        }

        // Update trip with timestamp
        const updatedTrip = {
            ...updateData,
            updatedAt: new Date().toISOString(),
        };

        await tripRef.update(updatedTrip);

        // Fetch updated document
        const updated = await tripRef.get();

        return NextResponse.json({
            message: "Trip updated successfully",
            data: { id: updated.id, ...updated.data() },
        });
    } catch (error) {
        console.error("Error updating trip:", error);
        return NextResponse.json(
            { error: "Failed to update trip" },
            { status: 500 }
        );
    }
}

// DELETE /api/trips - Delete a trip
export async function DELETE(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate request body
        const validationResult = deleteTripSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { id } = validationResult.data;

        // Check if trip exists
        const tripRef = db.collection("trips").doc(id);
        const tripDoc = await tripRef.get();

        if (!tripDoc.exists) {
            return NextResponse.json(
                { error: "Trip not found" },
                { status: 404 }
            );
        }

        // Delete the trip
        await tripRef.delete();

        return NextResponse.json({
            message: "Trip deleted successfully",
            id,
        });
    } catch (error) {
        console.error("Error deleting trip:", error);
        return NextResponse.json(
            { error: "Failed to delete trip" },
            { status: 500 }
        );
    }
}
