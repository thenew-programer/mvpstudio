import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Clear existing data
    await supabase.from('proposals').delete().neq('id', '');
    await supabase.from('project_ideas').delete().neq('id', '');

    // Create a test user
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: 'demo@mvpforge.com',
      password: 'demo123456',
      options: {
        data: {
          full_name: 'Demo User',
        },
      },
    });

    if (userError) throw userError;

    const userId = userData.user!.id;

    // Insert project idea
    const { data: ideaData, error: ideaError } = await supabase
      .from('project_ideas')
      .insert({
        user_id: userId,
        project_name: 'AI Customer Service Platform',
        problem_statement: 'Small businesses struggle to provide 24/7 customer support without a large team.',
        target_users: 'Small to medium-sized business owners in e-commerce and SaaS',
        key_features: [
          'AI chatbot for common inquiries',
          'Integration with existing tools',
          'Analytics dashboard',
          'Knowledge base builder',
          'Human handoff system'
        ],
        status: 'pending'
      })
      .select()
      .single();

    if (ideaError) throw ideaError;

    // Insert proposal
    const { error: proposalError } = await supabase
      .from('proposals')
      .insert({
        idea_id: ideaData.id,
        summary: 'AI-powered customer service automation platform for small businesses',
        tech_stack: {
          frontend: ['React', 'Next.js', 'TailwindCSS'],
          backend: ['Node.js', 'Supabase', 'OpenAI'],
          infrastructure: ['Vercel', 'PostgreSQL', 'Redis']
        },
        features: [
          {
            name: 'AI Chatbot',
            description: 'Intelligent conversational bot for handling customer inquiries',
            priority: 'high'
          },
          {
            name: 'Integration Hub',
            description: 'Connect with existing business tools and CRM systems',
            priority: 'high'
          },
          {
            name: 'Analytics Dashboard',
            description: 'Monitor customer service performance and AI effectiveness',
            priority: 'medium'
          }
        ],
        timeline: [
          {
            phase: 'Design & Planning',
            duration: '2 weeks',
            tasks: ['UI/UX design', 'Technical architecture', 'Database schema']
          },
          {
            phase: 'Core Development',
            duration: '4 weeks',
            tasks: ['Frontend development', 'Backend API', 'AI integration']
          },
          {
            phase: 'Testing & Launch',
            duration: '2 weeks',
            tasks: ['QA testing', 'Performance optimization', 'Deployment']
          }
        ],
        cost_estimate: 11000
      });

    if (proposalError) throw proposalError;

    // Create admin user
    const { error: adminError } = await supabase.auth.signUp({
      email: 'admin@mvpforge.com',
      password: 'admin123456',
      options: {
        data: {
          full_name: 'Admin User',
        },
      },
    });

    if (adminError) throw adminError;

    // Set admin role (requires direct database access, typically done through database migration)
    const { error: roleError } = await supabase.rpc('set_admin_role', {
      user_email: 'admin@mvpforge.com'
    });

    if (roleError) throw roleError;

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}