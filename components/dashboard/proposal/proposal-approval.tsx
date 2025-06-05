'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Loader2 } from 'lucide-react';

const formSchema = z.object({
  agreement: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms to proceed',
  }),
  feedback: z.string().optional(),
});

export function ProposalApproval() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agreement: false,
      feedback: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      console.log('Form values:', values);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Proposal approved! Redirecting to payment...');
      router.push('/dashboard/billing');
    } catch (error) {
      console.error('Error approving proposal:', error);
      toast.error('There was a problem approving the proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Proposal Approval</h3>
        <p className="text-muted-foreground">
          Review the project details and approve to begin development. You'll be directed to make the initial payment after approval.
        </p>
      </div>
      
      <Card className="border-primary">
        <CardHeader className="bg-primary/5">
          <CardTitle>Project Summary</CardTitle>
          <CardDescription>AI-powered customer service platform for small businesses</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Total Budget</h4>
                <p className="text-lg font-semibold">$11,000</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Timeline</h4>
                <p className="text-lg font-semibold">10 weeks</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Start Date</h4>
                <p className="text-lg font-semibold">May 15, 2025</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Completion Date</h4>
                <p className="text-lg font-semibold">July 25, 2025</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Key Deliverables</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>AI chatbot for customer service automation</li>
                <li>Integration hub for existing business tools</li>
                <li>Analytics dashboard with performance metrics</li>
                <li>Knowledge base builder for AI training</li>
                <li>Human handoff system for complex issues</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Additional Feedback</CardTitle>
              <CardDescription>
                Share any additional comments or concerns before approving the proposal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific questions or additional requests?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="agreement"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the proposed scope, timeline, and budget for this MVP project. I understand that after approval, I will be directed to make the initial payment to begin development.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-between">
              <Button variant="outline">Request Changes</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Approve Proposal
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}