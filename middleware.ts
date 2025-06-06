import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Auth routes - redirect to dashboard if already logged in
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Protected routes - redirect to login if not authenticated
  const protectedRoutes = ['/dashboard', '/onboarding', '/proposal', '/book-call'];
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check user progress for flow redirects
  if (session && isProtectedRoute) {
    try {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', session.user.id)
        .single();

      const currentPath = req.nextUrl.pathname;

      // Redirect based on progress
      if (!progress?.onboarding_complete && currentPath !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }

      if (progress?.onboarding_complete && progress?.proposal_status === 'pending' && currentPath !== '/proposal') {
        return NextResponse.redirect(new URL('/proposal', req.url));
      }

      if (progress?.proposal_status === 'accepted' && !progress?.call_booked && currentPath !== '/book-call') {
        return NextResponse.redirect(new URL('/book-call', req.url));
      }

      if (progress?.call_booked && (currentPath === '/onboarding' || currentPath === '/proposal' || currentPath === '/book-call')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    } catch (error) {
      console.error('Error checking user progress:', error);
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};