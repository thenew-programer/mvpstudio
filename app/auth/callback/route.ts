export const dynamic = 'force-dynamic';

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // For social auth users, ensure profile and progress records exist
      try {
        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (!existingProfile) {
          // Create profile for social auth user
          await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || 'User',
            });
        }

        // Check if user progress exists
        const { data: existingProgress } = await supabase
          .from('user_progress')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (!existingProgress) {
          // Create user progress record
          await supabase
            .from('user_progress')
            .insert({
              id: data.user.id,
              onboarding_complete: false,
              proposal_status: 'pending',
              call_booked: false
            });
        }
      } catch (error) {
        console.error('Error creating profile/progress for social auth user:', error);
        // Don't fail the auth flow, just log the error
      }
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}