# Trip Rating System - Implementation Guide

## Overview
This document explains how the trip rating and review system works, particularly how ratings are updated when a review is approved by an admin.

## Features Implemented

### 1. Past Trips API Filter
**Endpoint**: `/api/trips?completed=true`

The trips API now supports a `completed` query parameter that filters trips based on their end date:
- When `completed=true`, it returns only trips where `endDate < today`
- This automatically shows trips that have already been completed

**Example**:
```typescript
const response = await fetch('/api/trips?completed=true&status=published&limit=50');
```

### 2. Trip Rating Update API
**Endpoint**: `/api/trips/update-rating` (POST)

This endpoint updates a trip's rating when an admin approves a review.

**Request Body**:
```json
{
  "tripId": "trip-id-here",
  "newRating": 4.5
}
```

**Features**:
- Automatically calculates the new average rating
- Increments the review count
- Updates the trip document in Firestore
- Requires authentication (Clerk)

**Response**:
```json
{
  "message": "Trip rating updated successfully",
  "data": {
    "tripId": "trip-id-here",
    "rating": 4.7,
    "reviewCount": 15
  }
}
```

## How to Use in Admin Review Approval

### Step 1: When Admin Clicks "Accept Review" Button

In your admin reviews tab, when the admin clicks the "Accept Review" button, you should:

1. Approve the review in your reviews collection
2. Call the rating update API

**Example Implementation**:
```typescript
async function approveReview(reviewId: string, tripId: string, rating: number) {
  try {
    // 1. Update the review status to approved
    await fetch('/api/reviews/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId })
    });

    // 2. Update the trip rating
    await fetch('/api/trips/update-rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tripId: tripId,
        newRating: rating
      })
    });

    console.log('Review approved and trip rating updated');
  } catch (error) {
    console.error('Error approving review:', error);
  }
}
```

### Step 2: Transaction Flow

1. User submits a review with a rating (1-5 stars)
2. Review is stored with `status: "pending"`
3. Admin views pending reviews in admin panel
4. Admin clicks "Accept Review" button
5. System:
   - Updates review status to "approved"
   - Calls `/api/trips/update-rating` with tripId and rating
   - Trip's rating and reviewCount are automatically updated

## Database Schema

### Trip Document (Firestore)
```typescript
{
  id: string;
  title: string;
  destination: string;
  category: string;
  description: string;
  content: string;
  images: Array<{ url: string; deleteUrl?: string }>;
  status: "draft" | "published" | "archived";
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  price: number;
  maxParticipants: number;
  currentParticipants?: number;
  difficulty?: "Easy" | "Moderate" | "Challenging" | "Expert";
  duration?: string;
  included?: string[];
  notIncluded?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  featured?: boolean;
  rating?: number; // Average rating (0-5, with 1 decimal)
  reviewCount?: number; // Total number of approved reviews
  createdAt: string;
  updatedAt: string;
}
```

### Review Document (Suggested Schema)
```typescript
{
  id: string;
  tripId: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string; // Admin user ID
}
```

## Rating Calculation

The system uses a weighted average approach:

```typescript
// Formula
totalRating = (currentRating * currentReviewCount) + newRating
newReviewCount = currentReviewCount + 1
updatedRating = totalRating / newReviewCount
```

**Example**:
- Current rating: 4.5
- Current review count: 10
- New review rating: 5.0

```
totalRating = (4.5 * 10) + 5.0 = 50.0
newReviewCount = 10 + 1 = 11
updatedRating = 50.0 / 11 = 4.545... ≈ 4.5 (rounded to 1 decimal)
```

## Frontend Display

### Past Trips Page
The past trips page now:
- Fetches completed trips from `/api/trips?completed=true`
- Displays rating with stars
- Shows review count
- Is server-side rendered for better SEO

### Trip Detail Page
- Shows rating if available
- Can be extended to show individual reviews

## Error Handling

The rating update API includes validation for:
- Authentication (must be logged in)
- Trip existence
- Valid rating (1-5)
- Trip ID provided

## Security Considerations

1. **Authentication**: Only authenticated users can update ratings
2. **Validation**: Rating must be between 1 and 5
3. **Admin Only**: In production, you should add an additional check to ensure only admins can call this endpoint
4. **Review Verification**: Reviews should be verified before updating trip ratings

## Next Steps

To complete the review system, you should:

1. Create a reviews collection in Firestore
2. Add a review submission form on trip detail pages
3. Create an admin panel for reviewing pending reviews
4. Implement the "Accept Review" button that calls both:
   - Review approval API
   - Trip rating update API

## Example: Admin Review Approval Component

```typescript
'use client'

import { useState } from 'react';

interface Review {
  id: string;
  tripId: string;
  rating: number;
  comment: string;
  userName: string;
}

export function ReviewApprovalButton({ review }: { review: Review }) {
  const [loading, setLoading] = useState(false);

  async function handleApprove() {
    setLoading(true);
    try {
      // Update trip rating
      await fetch('/api/trips/update-rating', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripId: review.tripId,
          newRating: review.rating
        })
      });

      // Mark review as approved (you'll need to create this endpoint)
      await fetch(`/api/reviews/${review.id}/approve`, {
        method: 'POST'
      });

      alert('Review approved successfully!');
    } catch (error) {
      alert('Error approving review');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      {loading ? 'Approving...' : 'Accept Review'}
    </button>
  );
}
```

## API Endpoints Summary

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/trips?completed=true` | GET | Fetch completed trips | No |
| `/api/trips/update-rating` | POST | Update trip rating | Yes |

## Testing

Test the rating update API:
```bash
curl -X POST http://localhost:3000/api/trips/update-rating \
  -H "Content-Type: application/json" \
  -d '{
    "tripId": "your-trip-id",
    "newRating": 4.5
  }'
```
