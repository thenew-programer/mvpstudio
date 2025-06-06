'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Suspense } from 'react';

function LoadingCard() {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-center text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  );
}

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Confirming your email...');

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        const next = searchParams.get('next') ?? '/dashboard';

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
          });

          if (error) {
            setStatus('error');
            setMessage('There was a problem confirming your email. Please try signing up again.');
          } else {
            setStatus('success');
            setMessage('Email confirmed successfully! Redirecting...');
            setTimeout(() => router.push(next), 2000);
          }
        } else {
          setStatus('error');
          setMessage('Invalid confirmation link. Please try signing up again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    confirmEmail();
  }, [router, searchParams]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Email Confirmation</CardTitle>
        <CardDescription>Verifying your email address</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        {status === 'loading' && (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center text-muted-foreground">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
            <p className="text-center text-muted-foreground">{message}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <XCircle className="h-8 w-8 text-destructive mb-4" />
            <p className="text-center text-muted-foreground mb-4">{message}</p>
            <Button onClick={() => router.push('/signup')}>
              Back to Sign Up
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function ConfirmPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<LoadingCard />}>
        <ConfirmContent />
      </Suspense>
    </div>
  );
}