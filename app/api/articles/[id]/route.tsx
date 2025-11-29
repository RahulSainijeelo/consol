import { db } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        
        const docRef = db.collection("article").doc(id);
        const docSnap = await docRef.get();
        
        if (docSnap.exists) {
            const data = docSnap.data();
            return NextResponse.json({ id: docSnap.id, ...data }, { status: 200 });
        } else {
            return NextResponse.json(
                { error: "Article not found", message: "No such document!" },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error fetching document:", error);
        return NextResponse.json(
            { 
                error: "Failed to fetch article",
                message: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}