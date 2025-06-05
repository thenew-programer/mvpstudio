'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BillingHistory } from '@/components/dashboard/billing/billing-history';
import { BillingPlan } from '@/components/dashboard/billing/billing-plan';
import { toast } from 'sonner';
import { Loader2, CreditCard } from 'lucide-react';

export default function BillingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, we would redirect to Stripe checkout
      console.log('Redirecting to payment...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Payment successful! Development will begin shortly.');
      router.push('/dashboard');
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('There was a problem processing your payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage your payment methods and view your billing history
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Initial Payment Due</CardTitle>
          <CardDescription>First milestone payment to begin development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Amount Due</p>
              <p className="text-3xl font-bold">$4,000.00</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Payment for</p>
              <p className="font-medium">Project Kickoff Milestone</p>
              <p className="text-sm text-muted-foreground">Includes initial setup, design phase, and project planning</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button 
            className="w-full md:w-auto"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Make Payment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Tabs defaultValue="plan">
        <TabsList>
          <TabsTrigger value="plan">Payment Plan</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          <BillingPlan />
        </TabsContent>
        <TabsContent value="history">
          <BillingHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}