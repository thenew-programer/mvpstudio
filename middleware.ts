import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Auth routes - redirect to appropriate page if already logged in
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    // Check user progress to determine where to redirect
    try {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', session.user.id)
        .single();

      let redirectPath = '/dashboard';

      if (!progress) {
        redirectPath = '/onboarding';
      } else if (!progress.onboarding_complete) {
        redirectPath = '/onboarding';
      } else if (progress.proposal_status === 'pending') {
        redirectPath = '/proposal';
      } else if (progress.proposal_status === 'accepted' && !progress.call_booked) {
        redirectPath = '/book-call';
      }

      return NextResponse.redirect(new URL(redirectPath, req.url));
    } catch (error) {
      console.error('Error checking user progress in middleware:', error);
      return NextResponse.redirect(new URL('/onboarding', req.url));
    }
  }

  // Protected routes - redirect to login if not authenticated
  const protectedRoutes = ['/dashboard', '/onboarding', '/proposal', '/book-call'];
  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check if email is confirmed for authenticated users
  if (session && isProtectedRoute) {
    // Check if email is confirmed
    if (!session.user.email_confirmed_at) {
      return NextResponse.redirect(new URL('/auth/verify-email', req.url));
    }

    try {
      const { data: progress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', session.user.id)
        .single();

      const currentPath = req.nextUrl.pathname;

      // If no progress record exists, redirect to onboarding
      if (!progress) {
        if (currentPath !== '/onboarding') {
          return NextResponse.redirect(new URL('/onboarding', req.url));
        }
        return res;
      }

      // Redirect based on progress - enforce the proper sequence
      if (!progress.onboarding_complete && currentPath !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }

      if (progress.onboarding_complete && progress.proposal_status === 'pending' && currentPath !== '/proposal') {
        return NextResponse.redirect(new URL('/proposal', req.url));
      }

      if (progress.proposal_status === 'accepted' && !progress.call_booked && currentPath !== '/book-call') {
        return NextResponse.redirect(new URL('/book-call', req.url));
      }

      // If all steps are complete, allow access to dashboard and prevent going back to earlier steps
      if (progress.call_booked && (currentPath === '/onboarding' || currentPath === '/proposal' || currentPath === '/book-call')) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      // If user has completed onboarding but is trying to access it again, redirect to appropriate next step
      if (progress.onboarding_complete && currentPath === '/onboarding') {
        if (progress.proposal_status === 'pending') {
          return NextResponse.redirect(new URL('/proposal', req.url));
        } else if (progress.proposal_status === 'accepted' && !progress.call_booked) {
          return NextResponse.redirect(new URL('/book-call', req.url));
        } else if (progress.call_booked) {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }

      // If user has accepted proposal but is trying to access proposal page again
      if (progress.proposal_status === 'accepted' && currentPath === '/proposal') {
        if (!progress.call_booked) {
          return NextResponse.redirect(new URL('/book-call', req.url));
        } else {
          return NextResponse.redirect(new URL('/dashboard', req.url));
        }
      }

    } catch (error) {
      console.error('Error checking user progress:', error);
      // If we can't determine progress, redirect to onboarding to be safe
      if (currentPath !== '/onboarding') {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};