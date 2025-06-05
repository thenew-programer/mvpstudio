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
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0ZXR1aXFiZG1hdnJpYmdobGt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNTU1NTcsImV4cCI6MjA2NDczMTU1N30.7qQBQ1ZUQgPFjhb06TxcTswo3GtPBK9QWWppmtG9o0k'
);