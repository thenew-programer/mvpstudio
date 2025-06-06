'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { HeroSection } from '@/components/landing/hero-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { HowItWorksSection } from '@/components/landing/how-it-works-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { PricingSection } from '@/components/landing/pricing-section';
import { FAQSection } from '@/components/landing/faq-section';
import { CTASection } from '@/components/landing/cta-section';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/ui/back-to-top';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // User is authenticated, check their progress
          const redirectPath = await getRedirectPath(session.user.id);
          router.push(redirectPath);
          return;
        }
        
        // User is not authenticated, show landing page
        setIsCheckingAuth(false);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsCheckingAuth(false);
      }
    };

    checkAuthAndRedirect();
  }, [router]);

  const getRedirectPath = async (userId: string) => {
    try {
      // Check user progress to determine where to redirect
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('id', userId)
        .single();

      // If no progress record exists or error fetching, start with onboarding
      if (error || !progress) {
        console.log('No progress found, redirecting to onboarding');
        return '/onboarding';
      }

      // Check each step in order
      if (!progress.onboarding_complete) {
        console.log('Onboarding not complete, redirecting to onboarding');
        return '/onboarding';
      }

      if (progress.proposal_status === 'pending') {
        console.log('Proposal pending, redirecting to proposal');
        return '/proposal';
      }

      if (progress.proposal_status === 'accepted' && !progress.call_booked) {
        console.log('Proposal accepted but call not booked, redirecting to book-call');
        return '/book-call';
      }

      // If all steps are complete, go to dashboard
      console.log('All steps complete, redirecting to dashboard');
      return '/dashboard';
    } catch (error) {
      console.error('Error checking user progress:', error);
      // Default to onboarding if we can't determine progress
      return '/onboarding';
    }
  };

  // Show loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}