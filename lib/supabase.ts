import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  'https://ytetuiqbdmavribghlkt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZXR1aXFiZG1hdnJpYmdobGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzY4MDAsImV4cCI6MjAyNTI1MjgwMH0.qDJxM-fqhP_Gr0dq3-WxJQI6Ry7G7XYDqBqKyA-JxYg'
);

// For server-side operations that need the service role key
export const supabaseAdmin = createClient(
  'https://ytetuiqbdmavribghlkt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZXR1aXFiZG1hdnJpYmdobGt0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTY3NjgwMCwiZXhwIjoyMDI1MjUyODAwfQ.Gy2Vc9vFUHGrFQXXgK_wBtPBRGXJc3Qh5iokfNXBRJk'
);