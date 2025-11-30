export interface Trip {
    id: string;
    title: string;
    destination: string;
    category: string;
    description: string;
    content: string;
    images: { url: string; deleteUrl: string }[];
    status: 'draft' | 'published' | 'archived';
    startDate: string;
    endDate: string;
    price: number;
    maxParticipants: number;
    currentParticipants?: number;
    difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
    duration?: string; // e.g., "5 days 4 nights"
    included?: string[]; // What's included in the trip
    notIncluded?: string[]; // What's not included
    itinerary?: {
        day: number;
        title: string;
        description: string;
    }[];
    createdAt: string;
    updatedAt: string;
    publishDate?: string;
    author?: string;
    featured?: boolean;
    rating?: number;
    reviewCount?: number;
}

export interface TripFormData {
    id?: string;
    title: string;
    destination: string;
    category: string;
    description: string;
    content: string;
    images: { url: string; deleteUrl: string }[];
    status: 'draft' | 'published' | 'archived';
    startDate: string;
    endDate: string;
    price: number;
    maxParticipants: number;
    difficulty?: 'Easy' | 'Moderate' | 'Challenging' | 'Expert';
    duration?: string;
    included?: string[];
    notIncluded?: string[];
}
