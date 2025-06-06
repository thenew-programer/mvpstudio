import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ensureUserRecords = async (supabase: any, userId: string, userMetadata: any) => {
  try {
    console.log('Ensuring user records exist for:', userId);
    
    // Check if profile exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      console.error('Error checking profile:', profileCheckError);
      return false;
    }

    if (!existingProfile) {
      console.log('Creating missing profile for user:', userId);
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: userMetadata?.full_name || userMetadata?.name || 'User',
          role: 'user'
        });

      if (profileError) {
        console.error('Error creating profile in middleware:', profileError);
        return false;
      }
    }

    // Check if user progress exists
    const { data: existingProgress, error: progressCheckError } = await supabase
      .from('user_progress')
      .select('id')
      .eq('id', userId)
      .single();

    if (progressCheckError && progressCheckError.code !== 'PGRST116') {
      console.error('Error checking progress:', progressCheckError);
      return false;
    }

    if (!existingProgress) {
      console.log('Creating missing user progress for user:', userId);
      const { error: progressError } = await supabase
        .from('user_progress')
        .insert({
          id: userId,
          onboarding_complete: false,
          proposal_status: 'pending',
          call_booked: false
        });

      if (progressError) {
        console.error('Error creating user progress in middleware:', progressError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error ensuring user records:', error);
    return false;
  }
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const currentPath = req.nextUrl.pathname;

  // Auth routes - redirect to appropriate page if already logged in
  if (session && (currentPath === '/login' || currentPath === '/signup')) {
    try {
      // Ensure user records exist
      await ensureUserRecords(supabase, session.user.id, session.user.user_metadata);

      // Check user progress to determine where to redirect
      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (progressError) {
        console.error('Error fetching progress in middleware:', progressError);
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }

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
  const isProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route));

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
      // Ensure user records exist
      const recordsExist = await ensureUserRecords(supabase, session.user.id, session.user.user_metadata);
      
      if (!recordsExist) {
        console.log('Failed to ensure user records exist, redirecting to onboarding');
        if (currentPath !== '/onboarding') {
          return NextResponse.redirect(new URL('/onboarding', req.url));
        }
        return res;
      }

      const { data: progress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', session.user.id)
        .single();

      // If no progress record exists, redirect to onboarding
      if (progressError || !progress) {
        console.log('No progress record found, redirecting to onboarding');
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