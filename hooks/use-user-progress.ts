import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface UserProgress {
  id: string;
  onboarding_complete: boolean;
  proposal_status: 'pending' | 'accepted' | 'rejected';
  call_booked: boolean;
  created_at: string;
  updated_at: string;
}

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        throw error;
      }

      setProgress(data);
    } catch (err) {
      console.error('Error fetching user progress:', err);
      setError('Failed to load user progress');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          id: session.user.id,
          ...updates
        })
        .select()
        .single();

      if (error) throw error;

      setProgress(data);
      return data;
    } catch (err) {
      console.error('Error updating user progress:', err);
      throw err;
    }
  };

  return {
    progress,
    isLoading,
    error,
    fetchProgress,
    updateProgress
  };
}