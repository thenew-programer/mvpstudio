export const dynamic = 'force-dynamic';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const createUserRecords = async (supabase: any, userId: string, userMetadata: any) => {
  try {
    console.log('Creating user records for:', userId);
    
    // Check if profile exists first
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      console.error('Error checking existing profile:', profileCheckError);
      // Don't throw here, continue to try creating
    }

    if (!existingProfile) {
      console.log('Creating profile for user:', userId);
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: userMetadata?.full_name || userMetadata?.name || 'User',
          role: 'user'
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Don't throw if it's a duplicate key error
        if (!profileError.message.includes('duplicate') && !profileError.message.includes('already exists')) {
          throw profileError;
        }
      } else {
        console.log('Profile created successfully');
      }
    } else {
      console.log('Profile already exists for user:', userId);
    }

    // Check if user progress exists
    const { data: existingProgress, error: progressCheckError } = await supabase
      .from('user_progress')
      .select('id')
      .eq('id', userId)
      .single();

    if (progressCheckError && progressCheckError.code !== 'PGRST116') {
      console.error('Error checking existing progress:', progressCheckError);
      // Don't throw here, continue to try creating
    }

    if (!existingProgress) {
      console.log('Creating user progress for user:', userId);
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
        // Don't throw if it's a duplicate key error
        if (!progressError.message.includes('duplicate') && !progressError.message.includes('already exists')) {
          throw progressError;
        }
      } else {
        console.log('User progress created successfully');
      }
    } else {
      console.log('User progress already exists for user:', userId);
    }

    console.log('Successfully created/verified all user records for:', userId);
    return true;
  } catch (error) {
    console.error('Error in createUserRecords:', error);
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
        
        // Try to create user records, but don't fail the auth flow if it doesn't work
        const recordsCreated = await createUserRecords(supabase, data.user.id, data.user.user_metadata);
        
        if (!recordsCreated) {
          console.warn('Failed to create user records in callback, but continuing auth flow');
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