import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { proposalId } = session.metadata;

    // Update proposal status in Supabase
    const { error } = await supabase
      .from('project_ideas')
      .update({ status: 'paid' })
      .eq('id', proposalId);

    if (error) {
      console.error('Error updating proposal status:', error);
      return NextResponse.json(
        { error: 'Error updating proposal status' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}