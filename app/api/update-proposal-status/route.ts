import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { status, ideaId } = await request.json();

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

    // Update project idea status
    const { error: updateError } = await supabase
      .from('project_ideas')
      .update({ status })
      .eq('id', ideaId)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating project status:', updateError);
      return NextResponse.json(
        { error: 'Failed to update project status' },
        { status: 500 }
      );
    }

    // Update user progress
    await supabase
      .from('user_progress')
      .upsert({
        id: user.id,
        proposal_status: status
      });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating proposal status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}