import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnLogin = req.nextUrl.pathname.startsWith('/login');
  const isOnRedirect = req.nextUrl.pathname.startsWith('/r/');
  const isOnTerms = req.nextUrl.pathname.startsWith('/terms');
  const isOnPrivacy = req.nextUrl.pathname.startsWith('/privacy');

  // Allow redirect URLs to work without authentication
  if (isOnRedirect) {
    return NextResponse.next();
  }

  // Allow public access to legal pages
  if (isOnTerms || isOnPrivacy) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isLoggedIn && !isOnLogin) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // Redirect to home if already logged in and trying to access login
  if (isLoggedIn && isOnLogin) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
