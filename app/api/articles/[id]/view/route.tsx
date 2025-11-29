import { db } from "@/config/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        console.log(id)
        const docRef = db.collection("article").doc(id);
        const docSnap = await docRef.update({views:(FieldValue.increment(1)||1)});
        console.log(docSnap)
        if (docSnap) {
            return NextResponse.json({ docSnap }, { status: 200 });
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