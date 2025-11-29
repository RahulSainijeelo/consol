import { z } from "zod";
import { db } from "@/config/firebase"; 
import { NextRequest, NextResponse } from "next/server";
import moment from "moment"

const categories = [
  "Politics",
  "Dharm",
  "Bharat",
  "Global",
  "History",
] as const;

const preferences = [
  "Top Picks",
  "Editors Choice",
  "Specials",
  "none"
] as const;

const articleSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.enum(categories),
  author:z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  images: z.array(z.object({
  url: z.string().url("Invalid image URL"),
  deleteUrl:z.string(),
})),
  preference:z.enum(preferences).optional(),
  content:z.string().min(50,"Title must be at least 2 characters"),
  publishDate:z.string().default(moment().format("MMMM Do YYYY, h:mm:ss a")),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    
    const offset = (page - 1) * limit;

    let query:any = db.collection("article");
    switch (type) {
      case 'latest':
        query = query.orderBy("publishDate", "desc");
        break;
      case 'top-picks':
        query = query.where("preference", "==",  "Top Picks")
                     .orderBy("publishDate", "desc");
        break;
      case 'editors-choice':
        query = query.where("preference", "==",  "Editors Choice")
                     .orderBy("publishDate", "desc");
        break;
      case 'specials':
        query = query.where("preference", "==",  "Specials")
                     .orderBy("publishDate", "desc");
        break;
      default:
        query = query.orderBy("publishDate", "desc");
    }

    if (category && category !== 'all') {
      query = query.where("category", "==", category);
    }

    const totalSnapshot = await query.get();
    const totalCount = totalSnapshot.size;

    const snapshot = await query.offset(offset).limit(limit).get();
    
    const data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      timeAgo: type === 'latest' ? calculateTimeAgo(doc.data().publishDate) : undefined
    }));

    return NextResponse.json({
      data,
      pagination: {
        currentPage: page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page < Math.ceil(totalCount / limit),
        hasPrev: page > 1
      },
      type
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json("Failed to fetch article items", {
      status: 500,
    });
  }
}

function calculateTimeAgo(publishDate: string): string {
  const now = moment();
  const published = moment(publishDate);
  const duration = moment.duration(now.diff(published));
  
  if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())} minutes ago`;
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())} hours ago`;
  } else if (duration.asDays() < 30) {
    return `${Math.floor(duration.asDays())} days ago`;
  } else {
    return published.format('MMMM DD, YYYY');
  }
}

export async function POST(request: NextRequest) {
  try {

    const body = await request.json();
    const data = articleSchema.parse(body);

    await db.collection("article").add(data);
    return NextResponse.json("article item added successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("This is post and error is", error);
    return NextResponse.json(
      error instanceof z.ZodError
        ? JSON.stringify(error.errors)
        : "Internal Server Error",
      { status: 400 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) throw new Error("ID is required");

    const data = articleSchema.partial().parse(rest);

    await db.collection("article").doc(id).update(data);

    return NextResponse.json("article item updated successfully", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? JSON.stringify(error.errors)
        : "Internal Server Error",
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) throw new Error("ID is required");

    await db.collection("article").doc(id).delete();

    return NextResponse.json("article item deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      error instanceof z.ZodError
        ? JSON.stringify(error.errors)
        : "Internal Server Error",
      { status: 400 }
    );
  }
}
