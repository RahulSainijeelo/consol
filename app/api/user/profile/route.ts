import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET /api/user/profile - Get user profile
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("email", "==", session.user.email).limit(1).get();

        if (snapshot.empty) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        // Return safe user data (exclude password)
        const profile = {
            id: userDoc.id,
            name: userData.name,
            email: userData.email,
            number: userData.number || "",
            image: userData.image || "",
            role: userData.role || "user",
            createdAt: userData.createdAt
        };

        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}

// PUT /api/user/profile - Update user profile
export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, number, image } = body;

        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("email", "==", session.user.email).limit(1).get();

        if (snapshot.empty) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const userDoc = snapshot.docs[0];

        // Update fields
        const updates: any = {};
        if (name) updates.name = name;
        if (number) updates.number = number;
        if (image) updates.image = image;
        updates.updatedAt = new Date().toISOString();

        await userDoc.ref.update(updates);

        return NextResponse.json({
            message: "Profile updated successfully",
            updates
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
}
