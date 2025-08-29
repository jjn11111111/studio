import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // These are the routes that require authentication
  const protectedRoutes = ['/training', '/exercise', '/profile'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for the Firebase auth token in cookies
    // Note: The actual name of the cookie may vary based on your Firebase setup.
    // 'firebaseIdToken' is a placeholder. You may need to inspect your browser's cookies.
    const authToken = request.cookies.get('firebaseIdToken')?.value;

    if (!authToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect_to', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/training/:path*', '/exercise/:path*', '/profile'],
};
