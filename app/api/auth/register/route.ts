import { NextResponse } from "next/server";
import { db } from "@/config/firebase";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { name, email, password, number } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const usersRef = db.collection("users");
        const snapshot = await usersRef.where("email", "==", email).get();

        if (!snapshot.empty) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
            name,
            email,
            password: hashedPassword,
            number,
            createdAt: new Date().toISOString(),
            role: "user", // Default role
        };

        const docRef = await usersRef.add(newUser);

        return NextResponse.json(
            { message: "User created successfully", userId: docRef.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
