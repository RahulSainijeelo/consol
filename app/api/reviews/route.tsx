import { z } from "zod";
import { db } from "@/config/firebase"; // Use your admin SDK config
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  email: z.string().email("Invalid email address").optional(),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  enquiryId: z.string().optional(),
  tripId: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get("tripId");

    let query: FirebaseFirestore.Query = db.collection("reviews");

    if (tripId) {
      query = query.where("tripId", "==", tripId);
    }

    const snapshot = await query.get();
    const data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    const data = reviewSchema.parse(body);

    // 1. Authenticated Trip Review
    if (session && session.user && data.tripId) {
      // Check if user has a confirmed booking for this trip
      const bookingsSnapshot = await db.collection("bookings")
        .where("email", "==", session.user.email)
        .where("tripId", "==", data.tripId)
        .where("status", "==", "confirmed")
        .get();

      if (bookingsSnapshot.empty) {
        return NextResponse.json(
          { message: "You can only review trips you have confirmed bookings for." },
          { status: 403 }
        );
      }

      await db.collection("reviews").add({
        tripId: data.tripId,
        email: session.user.email,
        userName: session.user.name || data.name || "Anonymous",
        userImage: session.user.image || null,
        rating: data.rating,
        comment: data.comment,
        images: data.images || [],
        status: "pending",
        createdAt: new Date().toISOString(),
        type: "trip_review"
      });

      return NextResponse.json(
        { message: "Review submitted successfully and is pending approval." },
        { status: 200 }
      );

    } else if (data.tripId) {
      // 2. Trip Review (Guest/Past Trip) - Replaces Enquiry Flow
      if (!data.name || !data.email) {
        return NextResponse.json(
          { message: "Name and email are required for guest reviews." },
          { status: 400 }
        );
      }

      const tripSnapshot = await db.collection("trips").doc(data.tripId).get();

      if (!tripSnapshot.exists) {
        return NextResponse.json(
          { message: "Trip not found" },
          { status: 404 }
        );
      }

      const tripData = tripSnapshot.data();
      if (tripData?.completed !== true) {
        return NextResponse.json(
          { message: "Trip is not completed yet" },
          { status: 400 }
        );
      }

      await db.collection("reviews").add({
        tripId: data.tripId,
        name: data.name,
        email: data.email,
        rating: data.rating,
        comment: data.comment,
        images: data.images || [],
        status: "pending",
        createdAt: new Date().toISOString(),
        type: "trip_review"
      });

      return NextResponse.json(
        { message: "Review submitted successfully" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Invalid request. Provide tripId (for auth users) or enquiryId." },
      { status: 400 }
    );

  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      {
        err:
          error instanceof z.ZodError
            ? JSON.stringify(error.errors)
            : "Internal Server Error",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id)
      return NextResponse.json(
        { message: "Review ID is required" },
        { status: 400 }
      );

    await db.collection("reviews").doc(id).delete();

    return NextResponse.json(
      { message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      {
        status: 400,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !["pending", "approved", "rejected"].includes(status))
      return NextResponse.json(
        { message: "Invalid id or status" },
        { status: 400 }
      );
    const reviews = await db.collection("reviews").doc(id).get();
    if (reviews.exists === false) {
      return NextResponse.json(
        { message: "Review not found" },
        { status: 404 }
      );
    }

    // Update all matching documents (should be only one)
    await db.collection("reviews").doc(id).update({ status });
    return NextResponse.json(
      { message: "Review status updated" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }
}
