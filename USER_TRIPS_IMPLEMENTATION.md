# User Trips Implementation - My Trips Page

## Overview
Implemented user-specific trip management with NextAuth authentication, allowing users to view their upcoming and past trips with client-side caching.

## Features Implemented

### 1. User Bookings API
**Endpoint**: `/api/user/bookings` (GET)

**Authentication**: NextAuth (not Clerk - Clerk is for admin only)

**Query Parameters**:
- `type`: 'upcoming' | 'past' (optional)

**Features**:
- Fetches user's bookings by email from NextAuth session
- Joins bookings with trip data
- Filters by upcoming (startDate >= today) or past (endDate < today)
- Returns enriched booking data with full trip details

**Response**:
```json
{
  "data": [
    {
      "id": "booking-id",
      "tripId": "trip-id",
      "status": "confirmed",
      "createdAt": "2024-12-01T10:00:00Z",
      "trip": {
        "id": "trip-id",
        "title": "Amazing Bali Adventure",
        "destination": "Bali, Indonesia",
        ...
      }
    }
  ],
  "type": "upcoming",
  "count": 5
}
```

### 2. My Trips Page
**File**: `/app/(home)/my-trips/page.tsx`

**Features**:
- ✅ **NextAuth Authentication**: Uses `useSession()` hook
- ✅ **Login Redirect**: Shows login button linking to `/auth/login` if not authenticated
- ✅ **Tab Navigation**: Switch between Upcoming and Past trips
- ✅ **Client-Side Caching**: Caches data for 2 minutes per tab
- ✅ **Real-Time Data**: Fetches user's actual bookings from API
- ✅ **Loading States**: Shows spinner while loading
- ✅ **Empty States**: Beautiful empty state messages with CTAs

## Authentication Flow

### User Authentication (NextAuth)
```typescript
import { useSession } from 'next-auth/react';

const { data: session, status } = useSession();

// status can be: 'loading', 'authenticated', 'unauthenticated'
```

### Admin Authentication (Clerk)
```typescript
import { auth, currentUser } from '@clerk/nextjs/server';

const { isAuthenticated } = await auth();
const user = await currentUser();
```

**Important**: 
- **Users** = NextAuth (for customers booking trips)
- **Admins** = Clerk (for managing trips, bookings, reviews)

## Caching Strategy

The page implements a 2-minute client-side cache:

```typescript
const cacheTime = 2 * 60 * 1000; // 2 minutes

if (lastFetch[type] && (now - lastFetch[type]) < cacheTime) {
    return; // Use cached data
}
```

**Benefits**:
- Reduces server load
- Faster tab switching
- Still fresh enough for real-time updates
- Only fetches when switching tabs

## Page States

### 1. Loading State
Shows when:
- Session is loading
- Data is being fetched

Display:
- Spinner with "Loading your trips..." message

### 2. Unauthenticated State
Shows when:
- User is not logged in (status === 'unauthenticated')

Display:
- Login icon
- "Login Required" heading
- Description text
- "Login to Continue" button → redirects to `/auth/login`

### 3. Authenticated State
Shows when:
- User is logged in (status === 'authenticated')

Display:
- Tab navigation (Upcoming / Past)
- Trip cards with booking details
- Empty states if no trips

## Trip Cards

### Upcoming Trips Card
- Shows trip image
- "Upcoming" badge
- Category badge
- "Only X spots left!" warning (if ≤ 3 spots)
- Trip title and description
- Destination
- Start date
- Duration
- Current participants count
- "View Trip Details" button

### Past Trips Card
- Shows trip image
- "Completed" badge (green)
- Category badge
- Trip title and description
- Rating with stars (if available)
- Review count
- Destination
- Completion date
- Duration
- "View Details & Reviews" button

## Data Flow

1. **User logs in** with NextAuth
2. **Page loads** → checks session status
3. **If authenticated**:
   - Fetches upcoming trips initially
   - Caches data for 2 minutes
4. **User switches tab**:
   - Checks cache timestamp
   - If < 2 minutes old: uses cached data
   - If > 2 minutes old: fetches fresh data
5. **API returns** user's bookings + trip details
6. **Page displays** trips in grid layout

## API Integration

### Booking Creation Flow
When a user books a trip:

1. User clicks "Book This Trip"
2. POST to `/api/bookings` with:
   ```json
   {
     "tripId": "trip-id",
     "participants": 2,
     "specialRequests": "Vegetarian meals"
   }
   ```
3. API creates booking and increments trip participants
4. Booking appears in user's "My Trips" page

### Viewing Bookings
1. User visits `/my-trips`
2. NextAuth session validated
3. GET `/api/user/bookings?type=upcoming`
4. Returns user's bookings with trip details
5. Page displays cards

## Security

### Authentication Checks
- **Client-side**: `useSession()` hook
- **Server-side**: `getServerSession(authOptions)`

### Authorization
- Users can only see their own bookings
- Filtered by logged-in user's email
- No ability to see other users' data

### Session Validation
- Session checked on every API call
- Returns 401 if not authenticated
- Redirects handled gracefully on client

## Empty States

### No Upcoming Trips
```
[Calendar Icon]
No Upcoming Trips
Start planning your next adventure!
[Explore Trips] button
```

### No Past Trips
```
[Map Pin Icon]
No Past Trips
Your travel history will appear here.
```

## Responsive Design

- **Mobile**: Single column grid, padded header
- **Tablet**: 2-column grid
- **Desktop**: 3-column grid
- **Sticky tabs**: Tabs stick to top when scrolling

## File Structure

```
/app
  /api
    /user
      /bookings
        route.ts          # ✅ User bookings API
    /bookings
      route.ts            # Booking creation API
  /(home)
    /my-trips
      page.tsx            # ✅ My Trips page with auth
```

## Testing

### Test Authenticated User
1. Log in with NextAuth
2. Visit `/my-trips`
3. Should see your bookings

### Test Unauthenticated User
1. Log out
2. Visit `/my-trips`
3. Should see login prompt
4. Click "Login to Continue"
5. Should redirect to `/auth/login`

### Test Cache
1. Load page (fetches data)
2. Switch to "Past" tab (fetches data)
3. Switch back to "Upcoming" within 2 minutes
4. Should use cached data (no loading spinner)
5. Wait 2+ minutes
6. Switch tabs again
7. Should fetch fresh data

## Next Steps

To complete the booking system:

1. **Create Booking Form**: Add booking form on trip detail pages
2. **Payment Integration**: Integrate payment gateway
3. **Booking Confirmation**: Send confirmation emails
4. **Booking Management**: Allow users to cancel/modify bookings
5. **Review System**: Let users review past trips

## Troubleshooting

### "Unauthorized" Error
- Check NextAuth session is valid
- Verify `authOptions` configuration
- Check user has `email` in session

### Empty Trips List
- Check bookings exist in Firestore
- Verify `userEmail` matches session email
- Check trip IDs in bookings are valid

### Cache Not Working
- Check `lastFetch` state updates
- Verify time comparison logic
- Check Date.now() returns milliseconds

## API Endpoints Summary

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/user/bookings` | GET | NextAuth | Fetch user's bookings |
| `/api/bookings` | POST | Clerk/NextAuth | Create booking |
| `/api/trips` | GET | None | List all trips |

## Environment Variables

No new environment variables required. Uses existing:
- NextAuth configuration in `/lib/auth.ts`
- Firebase configuration in `/config/firebase.ts`
