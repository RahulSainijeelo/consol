import { z } from "zod";
import { db } from "@/config/firebase"; // Use your admin SDK config
import { NextRequest, NextResponse } from "next/server";

const reviewSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Comment must be at least 5 characters"),
  enquiryId: z.string().min(1, "Enquiry ID is required"),
});

export async function GET() {
  try {
    const snapshot = await db.collection("reviews").get();
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
    const body = await request.json();
    const data = reviewSchema.parse(body);
    const snapshot = await db
      .collection("enquiries")
      .where("id", "==", data.enquiryId)
      .get();
    if (snapshot.empty) {
      return NextResponse.json(
        { message: "Enquiry not found" },
        { status: 404 }
      );
    }
    if (snapshot.docs[0].data().status !== "completed") {
      return NextResponse.json(
        { message: "Enquiry Not completed Yet" },
        { status: 400 }
      );
    }
    await db.collection("reviews").add({
      ...data,
      status: "pending",
      time: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Review submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
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
