import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Mock OpenAI response for now - replace with actual OpenAI API call
const generateMockProposal = (idea: string) => {
  return {
    summary: `Based on your idea: "${idea.substring(0, 100)}...", we recommend building a modern web application that addresses your target market's needs. This MVP will focus on core functionality while maintaining scalability for future growth.`,
    techStack: {
      frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Supabase', 'PostgreSQL'],
      infrastructure: ['Vercel', 'GitHub Actions', 'Stripe']
    },
    features: [
      {
        name: 'User Authentication',
        description: 'Secure login and registration system with email verification',
        priority: 'high'
      },
      {
        name: 'Core Dashboard',
        description: 'Main interface for users to interact with your platform',
        priority: 'high'
      },
      {
        name: 'Data Management',
        description: 'CRUD operations for your main business entities',
        priority: 'high'
      },
      {
        name: 'Payment Integration',
        description: 'Secure payment processing with Stripe',
        priority: 'medium'
      },
      {
        name: 'Analytics Dashboard',
        description: 'Basic analytics and reporting functionality',
        priority: 'medium'
      }
    ],
    timeline: [
      {
        phase: 'Planning & Design',
        duration: '1 week',
        tasks: ['Requirements analysis', 'UI/UX design', 'Technical architecture']
      },
      {
        phase: 'Core Development',
        duration: '3 weeks',
        tasks: ['Authentication system', 'Main features', 'Database setup']
      },
      {
        phase: 'Integration & Testing',
        duration: '1 week',
        tasks: ['Payment integration', 'Testing', 'Bug fixes']
      },
      {
        phase: 'Deployment & Launch',
        duration: '1 week',
        tasks: ['Production setup', 'Final testing', 'Go live']
      }
    ],
    estimate: {
      timeline: '6 weeks',
      cost: Math.floor(Math.random() * 10000) + 5000 // Random cost between $5k-$15k
    }
  };
};

export async function POST(request: Request) {
  try {
    const { projectName, problemStatement, targetUsers, keyFeatures } = await request.json();

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

    // Combine all input into a single idea string
    const fullIdea = `Project: ${projectName}\nProblem: ${problemStatement}\nTarget Users: ${targetUsers}\nKey Features: ${keyFeatures}`;

    // Generate proposal (mock for now)
    const proposal = generateMockProposal(fullIdea);

    // Save the project idea to database
    const { data: ideaData, error: ideaError } = await supabase
      .from('project_ideas')
      .insert({
        user_id: user.id,
        project_name: projectName,
        problem_statement: problemStatement,
        target_users: targetUsers,
        key_features: keyFeatures.split('\n').filter((f: string) => f.trim()),
        status: 'pending'
      })
      .select()
      .single();

    if (ideaError) {
      console.error('Error saving project idea:', ideaError);
      return NextResponse.json(
        { error: 'Failed to save project idea' },
        { status: 500 }
      );
    }

    // Save the proposal
    const { error: proposalError } = await supabase
      .from('proposals')
      .insert({
        idea_id: ideaData.id,
        summary: proposal.summary,
        tech_stack: proposal.techStack,
        features: proposal.features,
        timeline: proposal.timeline,
        cost_estimate: proposal.estimate.cost
      });

    if (proposalError) {
      console.error('Error saving proposal:', proposalError);
      return NextResponse.json(
        { error: 'Failed to save proposal' },
        { status: 500 }
      );
    }

    // Update user progress - onboarding complete
    await supabase
      .from('user_progress')
      .upsert({
        id: user.id,
        onboarding_complete: true
      });

    return NextResponse.json({
      success: true,
      proposal,
      ideaId: ideaData.id
    });

  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}