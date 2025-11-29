import { db } from "@/config/firebase";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";

// Valid categories - this prevents static files from being processed
const validCategories = [
    'politics', 'opinions', 'news-reports', 'media', 
    'bollywood-sports', 'dharm', 'bharat', 'global', 'history', 'about'
];

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

export async function GET(req: NextRequest, { params }: { params: Promise<{ category: string }> }) {
    try {
        const resolvedParams = await params;
        const { category } = resolvedParams;
        
        // ✅ Immediately reject static files and invalid categories
        if (!category || 
            typeof category !== 'string' || 
            category.includes('.') || 
            category.length > 50 ||
            !validCategories.includes(category.toLowerCase())) {
            return NextResponse.json(
                { error: "Invalid category" },
                { status: 404 }
            );
        }

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
        
        const offset = (page - 1) * limit;

        // Map URL-friendly category names to actual category names
        const categoryMap: { [key: string]: string } = {
            'politics': 'Politics',
            'bollywood-sports': 'Bollywood & Sports',
            'dharm': 'Dharm',
            'bharat': 'Bharat',
            'global': 'Global',
            'history': 'History',
            'about': 'About'
        };

        const actualCategory = categoryMap[category.toLowerCase()];
        
        if (!actualCategory) {
            return NextResponse.json(
                { error: "Category not found" },
                { status: 404 }
            );
        }

        // Get total count for pagination
        const totalSnapshot = await db.collection("article")
            .where("category", "==", actualCategory)
            .get();
        const totalCount = totalSnapshot.size;

        // Get paginated data
        const snapshot = await db.collection("article")
            .where("category", "==", actualCategory)
            .orderBy("publishDate", "desc")
            .offset(offset)
            .limit(limit)
            .get();

        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            timeAgo: calculateTimeAgo(doc.data()?.publishDate || '')
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
            category: actualCategory
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching category articles:", error);
        return NextResponse.json({
            error: "Failed to fetch category articles",
            message: error instanceof Error ? error.message : "Unknown error"
        }, {
            status: 500,
        });
    }
}