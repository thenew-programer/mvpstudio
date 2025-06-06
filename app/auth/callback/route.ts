export const dynamic = 'force-dynamic';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const createUserRecords = async (supabase: any, userId: string, userMetadata: any) => {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Create profile for social auth user
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: userMetadata?.full_name || userMetadata?.name || 'User',
          role: 'user'
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        throw profileError;
      }
    }

    // Check if user progress exists
    const { data: existingProgress } = await supabase
      .from('user_progress')
      .select('id')
      .eq('id', userId)
      .single();

    if (!existingProgress) {
      // Create user progress record
      const { error: progressError } = await supabase
        .from('user_progress')
        .insert({
          id: userId,
          onboarding_complete: false,
          proposal_status: 'pending',
          call_booked: false
        });

      if (progressError) {
        console.error('Error creating user progress:', progressError);
        throw progressError;
      }
    }

    console.log('Successfully created/verified profile and progress records for user:', userId);
  } catch (error) {
    console.error('Error in createUserRecords:', error);
    throw error;
  }
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Auth exchange error:', error);
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_error`);
      }

      if (data.user) {
        try {
          // For any authenticated user (social auth or email confirmation), ensure records exist
          await createUserRecords(supabase, data.user.id, data.user.user_metadata);
        } catch (recordError) {
          console.error('Error creating user records in callback:', recordError);
          // Don't fail the auth flow, just log the error
          // The middleware will handle missing records by redirecting to onboarding
        }
      }
    } catch (error) {
      console.error('Callback error:', error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=callback_error`);
    }
  }

  // Always redirect to dashboard - middleware will handle proper routing based on user progress
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}