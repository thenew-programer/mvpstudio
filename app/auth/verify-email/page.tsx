'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function VerifyEmailPage() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get user email from session
    const getUserEmail = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      }
    };

    getUserEmail();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleResendEmail = async () => {
    if (!canResend || isResending || !userEmail) return;

    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (error) {
        throw error;
      }

      toast.success('Verification email sent! Check your inbox.');
      setCanResend(false);
      setCountdown(60); // 60 second cooldown
    } catch (error: any) {
      console.error('Error resending email:', error);
      toast.error('Failed to resend email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const handleCheckEmailConfirmation = async () => {
    try {
      // Refresh the session to check if email is now confirmed
      const { data: { session }, error } = await supabase.auth.refreshSession();
      
      if (error) {
        throw error;
      }

      if (session?.user?.email_confirmed_at) {
        toast.success('Email confirmed! Redirecting...');
        router.push('/onboarding');
      } else {
        toast.info('Email not yet confirmed. Please check your inbox and click the confirmation link.');
      }
    } catch (error) {
      console.error('Error checking email confirmation:', error);
      toast.error('Failed to check email confirmation status.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <Card className="w-full max-w-md relative overflow-hidden bg-gradient-to-br from-card/80 to-card border-0 shadow-2xl backdrop-blur-sm">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        <CardHeader className="space-y-1 relative text-center">
          <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
          <CardDescription className="text-base">
            We've sent you a verification link to confirm your email address
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center justify-center py-8 relative">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 mb-6 shadow-lg">
            <Mail className="h-12 w-12 text-white" />
          </div>
          
          {userEmail && (
            <p className="text-center text-sm text-muted-foreground mb-4">
              Verification email sent to: <strong>{userEmail}</strong>
            </p>
          )}
          
          <p className="text-center text-muted-foreground mb-8 leading-relaxed">
            Click the link in the email to verify your account. If you don't see it, check your spam folder.
          </p>
          
          <div className="flex flex-col space-y-4 w-full">
            <Button
              onClick={handleCheckEmailConfirmation}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            >
              <CheckCircle className="mr-2 h-5 w-5" />
              I've Confirmed My Email
            </Button>

            <Button
              onClick={handleResendEmail}
              disabled={!canResend || isResending || !userEmail}
              variant="outline"
              className="w-full h-12 text-base font-semibold border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : !canResend ? (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Resend in {countdown}s
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Resend Email
                </>
              )}
            </Button>
            
            <Link href="/login">
              <Button variant="ghost" className="w-full h-12 text-base hover:bg-muted/50">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}