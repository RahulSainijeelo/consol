import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();
export async function GET(request:any) {
  const { pathname } = new URL(request.url);
  
  if (pathname.includes('.png') || pathname.includes('.ico') || 
      pathname.includes('android-chrome-') || pathname.includes('apple-touch-icon')) {
    return new Response(null, { status: 404 });
  }
}

export const config = {
  matcher: [
    "/dashboard((?!/api|_next|.*\\..*).*)", // Protect all /dashboard routes
  ],
};