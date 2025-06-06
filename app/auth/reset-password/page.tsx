'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Loader2, Lock, CheckCircle, XCircle } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

function LoadingCard() {
  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-card/80 to-card border-0 shadow-2xl backdrop-blur-sm">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-center text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying reset link...');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const verifyResetLink = async () => {
      try {
        // Check for the new Supabase auth flow parameters
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        
        // Also check for legacy parameters
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');

        // Handle new auth flow (token_hash)
        if (token_hash && type === 'recovery') {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: 'recovery',
          });

          if (error) {
            console.error('Error verifying OTP:', error);
            setStatus('error');
            setMessage('Invalid or expired reset link. Please request a new one.');
          } else {
            setStatus('ready');
            setMessage('');
          }
          return;
        }

        // Handle legacy auth flow (access_token/refresh_token)
        if (type === 'recovery' && access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error('Error setting session:', error);
            setStatus('error');
            setMessage('Invalid or expired reset link. Please request a new one.');
          } else {
            setStatus('ready');
            setMessage('');
          }
          return;
        }

        // If we get here, the link format is not recognized
        setStatus('error');
        setMessage('Invalid reset link format. Please request a new reset link.');
        
      } catch (error) {
        console.error('Error verifying reset link:', error);
        setStatus('error');
        setMessage('An error occurred while verifying the reset link. Please try again.');
      }
    };

    verifyResetLink();
  }, [searchParams]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session. Please use a fresh reset link.');
      }

      const { error } = await supabase.auth.updateUser({
        password: values.password
      });

      if (error) {
        console.error('Password update error:', error);
        throw error;
      }
      
      setStatus('success');
      setMessage('Password updated successfully! Redirecting to login...');
      
      // Sign out the user and redirect to login
      await supabase.auth.signOut();
      
      setTimeout(() => {
        router.push('/login');
      }, 2000);
      
      toast.success('Password updated successfully!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      
      let errorMessage = 'Failed to update password. Please try again.';
      
      if (error.message?.includes('session')) {
        errorMessage = 'Your reset link has expired. Please request a new one.';
        setStatus('error');
        setMessage(errorMessage);
      } else if (error.message?.includes('same password')) {
        errorMessage = 'New password must be different from your current password.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md bg-gradient-to-br from-card/80 to-card border-0 shadow-2xl backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-center text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    );
  }

  if (status === 'error') {
    return (
      <Card className="w-full max-w-md bg-gradient-to-br from-card/80 to-card border-0 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Reset Link Invalid</CardTitle>
          <CardDescription>There was a problem with your reset link</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <XCircle className="h-8 w-8 text-destructive mb-4" />
          <p className="text-center text-muted-foreground mb-4">{message}</p>
          <Button onClick={() => router.push('/forgot-password')}>
            Request New Reset Link
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (status === 'success') {
    return (
      <Card className="w-full max-w-md bg-gradient-to-br from-card/80 to-card border-0 shadow-2xl backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Password Updated</CardTitle>
          <CardDescription>Your password has been successfully changed</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
          <p className="text-center text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md bg-gradient-to-br from-card/80 to-card border-0 shadow-2xl backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      
      <CardHeader className="space-y-1 relative text-center">
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-3 mb-4 shadow-lg mx-auto w-fit">
          <Lock className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>Enter your new password below</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 relative">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 text-base border-2 focus:border-primary transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Confirm New Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      className="h-12 text-base border-2 focus:border-primary transition-colors"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating Password...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20">
      <Suspense fallback={<LoadingCard />}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}