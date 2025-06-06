import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { date, time, timezone } = await request.json();

    // Verify the user is authenticated
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Save call booking (you might want to create a separate table for this)
    const { error: logError } = await supabase.rpc('log_system_event', {
      event_type: 'CALL_BOOKED',
      description: `User booked a call for ${date} at ${time} (${timezone})`,
      metadata: { date, time, timezone, user_id: user.id }
    });

    if (logError) {
      console.error('Error logging call booking:', logError);
    }

    // Update user progress
    const { error: progressError } = await supabase
      .from('user_progress')
      .upsert({
        id: user.id,
        call_booked: true
      });

    if (progressError) {
      console.error('Error updating user progress:', progressError);
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error booking call:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}