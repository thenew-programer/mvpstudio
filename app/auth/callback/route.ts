export const dynamic = 'force-dynamic';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ensureUserRecords = async (supabase: any, userId: string) => {
  try {
    console.log('Ensuring user records exist for:', userId);
    
    // Use the manual initialization function we created
    const { data, error } = await supabase.rpc('initialize_user_records', {
      user_id: userId
    });

    if (error) {
      console.error('Error initializing user records:', error);
      return false;
    }

    console.log('User records initialized successfully:', data);
    return true;
  } catch (error) {
    console.error('Error in ensureUserRecords:', error);
    return false;
  }
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  console.log('Auth callback triggered with code:', !!code);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
      console.log('Exchanging code for session...');
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth exchange error:', error);
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_error`);
      }

      if (data.user) {
        console.log('User authenticated successfully:', data.user.id);
        
        // Try to ensure user records exist
        const recordsCreated = await ensureUserRecords(supabase, data.user.id);
        
        if (!recordsCreated) {
          console.warn('Failed to ensure user records in callback, but continuing auth flow');
        }
      }
    } catch (error) {
      console.error('Callback error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=callback_error`);
    }
  }

  // Always redirect to dashboard - middleware will handle proper routing based on user progress
  console.log('Redirecting to dashboard');
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}