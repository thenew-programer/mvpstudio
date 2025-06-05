'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Rocket, Mic, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { OnboardingProgress } from '@/components/onboarding/onboarding-progress';

const formSchema = z.object({
  idea: z.string().min(20, 'Please provide more details about your idea (at least 20 characters)'),
});

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idea: '',
    },
  });

  const startRecording = () => {
    // In a real app, this would use the Web Speech API or similar
    setIsRecording(true);
    toast.info('Voice recording started. Speak clearly about your idea.');
    
    // Simulate recording for demo purposes
    setTimeout(() => {
      form.setValue('idea', 'I want to build a platform that helps small business owners automate their customer service using AI. It should integrate with their existing tools and provide insights about customer satisfaction.');
      setIsRecording(false);
      toast.success('Voice recording processed successfully!');
    }, 3000);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate AI processing
      console.log('Processing idea:', values.idea);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Your idea has been processed successfully!');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error processing idea:', error);
      toast.error('There was a problem processing your idea. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="bg-background border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MVPForge</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-10">
        <OnboardingProgress currentStep={1} />
        
        <div className="max-w-2xl mx-auto mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Describe your startup idea</CardTitle>
              <CardDescription>
                Tell us about your vision, target audience, and key features you'd like to include in your MVP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="idea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Startup Idea</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your idea in detail. What problem does it solve? Who is it for? What are the key features?"
                              className="min-h-[200px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="flex-shrink-0"
                            onClick={startRecording}
                            disabled={isRecording}
                          >
                            {isRecording ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Mic className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormDescription>
                          Be as specific as possible. Our AI will use this to generate your project proposal.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing your idea...
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}