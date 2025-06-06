'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Loader2, StopCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const formSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters'),
  problemStatement: z.string().min(20, 'Please provide more details about the problem'),
  targetUsers: z.string().min(10, 'Please describe your target users'),
  keyFeatures: z.string().min(20, 'Please list some key features'),
});

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      problemStatement: '',
      targetUsers: '',
      keyFeatures: '',
    },
  });

  const startRecording = async () => {
    try {
      setIsRecording(true);
      toast.info('Voice recording started. Speak clearly about your idea.');
      
      // Simulate voice recording for demo
      setTimeout(() => {
        form.setValue('projectName', 'AI Customer Service Platform');
        form.setValue('problemStatement', 'Small businesses struggle to provide 24/7 customer support without hiring a large team. Current solutions are either too expensive or too complex for small business owners to implement effectively.');
        form.setValue('targetUsers', 'Small to medium-sized business owners in e-commerce, SaaS, and service industries who want to improve customer service efficiency while maintaining high satisfaction rates.');
        form.setValue('keyFeatures', 'AI chatbot for common inquiries\nIntegration with existing tools\nAnalytics dashboard\nKnowledge base builder\nHuman handoff system');
        setIsRecording(false);
        toast.success('Voice recording processed successfully!');
      }, 3000);
    } catch (error) {
      console.error('Error with voice recording:', error);
      toast.error('Could not access microphone. Please check your permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast.info('Recording stopped.');
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch('/api/generate-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate proposal');
      }
      
      toast.success('Proposal generated successfully!');
      router.push('/proposal');
    } catch (error) {
      console.error('Error submitting idea:', error);
      toast.error('There was a problem generating your proposal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 pt-20">
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Tell Us About Your Idea</h1>
            <p className="text-muted-foreground">
              Share the details of your startup idea and we'll help turn it into reality.
            </p>
          </div>

          <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl">Describe Your Startup Idea</CardTitle>
              <CardDescription>
                The more details you provide, the better we can tailor your MVP proposal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., TaskMaster Pro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="problemStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What Problem Does It Solve?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the problem your idea solves..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetUsers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Who Are Your Target Users?</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your ideal users..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keyFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Features</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the main features of your MVP (one per line)..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant={isRecording ? "destructive" : "secondary"}
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isLoading}
                      >
                        {isRecording ? (
                          <>
                            <StopCircle className="mr-2 h-4 w-4" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="mr-2 h-4 w-4" />
                            Record Voice Description
                          </>
                        )}
                      </Button>
                      {isRecording && (
                        <span className="text-sm text-muted-foreground animate-pulse">
                          Recording...
                        </span>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Proposal...
                        </>
                      ) : (
                        <>
                          Generate My Proposal
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}