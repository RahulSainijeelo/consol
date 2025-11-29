import { db } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const snapshot = await db.collection("article").orderBy("publishDate", "desc").get();
        const data = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            ...doc.data()
        }))
        return NextResponse.json({ data, status: 500 })
    } catch (error) {
        console.error("Error fetching articles:", error);
        return NextResponse.json("Failed to fetch article items", {
            status: 500,
        });

    }
}