import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Verify request is authorized
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Verify the user making the request is already an admin
    const { data: isAdmin } = await supabaseAdmin.rpc('check_is_admin', {
      user_id: user.id
    });

    if (!isAdmin) {
      throw new Error('Unauthorized - Admin access required');
    }

    // Get email from request body
    const { email } = await req.json();
    if (!email) {
      throw new Error('Email is required');
    }

    // Create or update profile as admin
    const { error: adminError } = await supabaseAdmin.rpc('set_admin_role', {
      user_email: email
    });

    if (adminError) {
      throw adminError;
    }

    // Log the action
    await supabaseAdmin.rpc('log_system_event', {
      event_type: 'ADMIN_CREATED',
      description: `New admin user created: ${email}`,
      metadata: { created_by: user.email }
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Admin user created successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message || 'An error occurred while creating admin user'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message === 'Unauthorized' ? 401 : 400,
      }
    );
  }
});