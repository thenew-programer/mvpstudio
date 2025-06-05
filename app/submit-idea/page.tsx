'use client';

import { useState, useRef } from 'react';
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
import { Mic, Loader2, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Proposal } from './proposal';
import { motion, AnimatePresence } from 'framer-motion';

const formSchema = z.object({
  projectName: z.string().min(2, 'Project name must be at least 2 characters'),
  problemStatement: z.string().min(20, 'Please provide more details about the problem'),
  targetUsers: z.string().min(10, 'Please describe your target users'),
  keyFeatures: z.string().min(20, 'Please list some key features'),
});

const mockProposal = {
  summary: "Based on your input, we recommend building a modern SaaS platform that solves [problem] for [target users]. The MVP will focus on delivering core value through essential features while maintaining scalability for future growth.",
  techStack: {
    frontend: ['React', 'Next.js', 'TailwindCSS', 'TypeScript'],
    backend: ['Node.js', 'Supabase', 'PostgreSQL'],
    infrastructure: ['Vercel', 'Docker', 'GitHub Actions']
  },
  features: [
    {
      name: "User Authentication",
      description: "Secure login and registration system with role-based access control",
      priority: "high"
    },
    {
      name: "Dashboard",
      description: "Intuitive interface for managing core functionality and viewing analytics",
      priority: "high"
    },
    {
      name: "API Integration",
      description: "Connect with third-party services for enhanced functionality",
      priority: "medium"
    }
  ],
  timeline: [
    {
      phase: "Design & Planning",
      duration: "2 weeks",
      tasks: [
        "UI/UX design",
        "Technical architecture",
        "Database schema design"
      ]
    },
    {
      phase: "Core Development",
      duration: "4 weeks",
      tasks: [
        "Frontend implementation",
        "Backend API development",
        "Authentication system"
      ]
    },
    {
      phase: "Testing & Launch",
      duration: "2 weeks",
      tasks: [
        "Quality assurance",
        "Performance optimization",
        "Deployment setup"
      ]
    }
  ],
  costEstimate: 15000
};

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

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
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        console.log('Recording completed:', audioBlob);
        toast.success('Voice recording completed!');
      };

      mediaRecorder.current.start();
      setIsRecording(true);
      toast.info('Recording started... Speak clearly about your idea.');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error('Could not access microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setIsGenerating(true);
    
    try {
      // TODO: Save to Supabase
      console.log('Form values:', values);
      
      // Simulate API processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setShowProposal(true);
      toast.success('Proposal generated successfully!');
    } catch (error) {
      console.error('Error submitting idea:', error);
      toast.error('There was a problem generating your proposal. Please try again.');
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 pt-20">
      <div className="container py-10">
        <AnimatePresence mode="wait">
          {!showProposal ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Describe Your Startup Idea</CardTitle>
                  <CardDescription>
                    Share the details of your idea and we'll help turn it into reality.
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
                                placeholder="List the main features of your MVP..."
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
                            'Submit Idea'
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <Proposal proposal={mockProposal} />
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && !showProposal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-medium">Generating Your Proposal</h3>
              <p className="text-sm text-muted-foreground">Our AI is analyzing your idea...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}