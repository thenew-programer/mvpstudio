'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, RefreshCw, Loader2, Clock, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

interface Proposal {
  summary: string;
  techStack: {
    frontend: string[];
    backend: string[];
    infrastructure: string[];
  };
  features: {
    name: string;
    description: string;
    priority: string;
  }[];
  timeline: {
    phase: string;
    duration: string;
    tasks: string[];
  }[];
  estimate: {
    timeline: string;
    cost: number;
  };
}

export default function ProposalPage() {
  const router = useRouter();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [ideaId, setIdeaId] = useState<string | null>(null);

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Get the latest proposal for this user
      const { data: proposalData, error } = await supabase
        .from('proposals')
        .select(`
          *,
          project_ideas!inner(id, user_id)
        `)
        .eq('project_ideas.user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching proposal:', error);
        toast.error('Failed to load proposal');
        return;
      }

      if (proposalData) {
        setProposal({
          summary: proposalData.summary,
          techStack: proposalData.tech_stack,
          features: proposalData.features,
          timeline: proposalData.timeline,
          estimate: {
            timeline: proposalData.timeline.reduce((total: number, phase: any) => {
              const weeks = parseInt(phase.duration.split(' ')[0]);
              return total + weeks;
            }, 0) + ' weeks',
            cost: proposalData.cost_estimate
          }
        });
        setIdeaId(proposalData.project_ideas.id);
      }
    } catch (error) {
      console.error('Error fetching proposal:', error);
      toast.error('Failed to load proposal');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!ideaId) return;
    
    setIsAccepting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/update-proposal-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          status: 'accepted',
          ideaId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept proposal');
      }

      toast.success('Proposal accepted! Redirecting to book your call...');
      router.push('/book-call');
    } catch (error) {
      console.error('Error accepting proposal:', error);
      toast.error('Failed to accept proposal. Please try again.');
    } finally {
      setIsAccepting(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      // Redirect back to onboarding to regenerate
      router.push('/onboarding');
    } catch (error) {
      console.error('Error retrying:', error);
      toast.error('Failed to retry. Please try again.');
    } finally {
      setIsRetrying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Proposal Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find a proposal for your account.
          </p>
          <Button onClick={() => router.push('/onboarding')}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 pt-20">
      <div className="container py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Your MVP Proposal</h1>
            <p className="text-muted-foreground">
              Review your AI-generated project proposal and decide how to proceed.
            </p>
          </div>

          <div className="space-y-6">
            {/* Summary */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{proposal.summary}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Clock className="h-8 w-8 text-primary mr-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Timeline</p>
                      <p className="text-2xl font-bold">{proposal.estimate.timeline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-green-500 mr-4" />
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Cost</p>
                      <p className="text-2xl font-bold">${proposal.estimate.cost.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tech Stack */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle>Recommended Tech Stack</CardTitle>
                <CardDescription>Technologies we'll use to build your MVP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(proposal.techStack).map(([category, technologies]) => (
                    <div key={category}>
                      <h3 className="font-medium mb-2 capitalize">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>Core functionality for your MVP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {proposal.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{feature.name}</h4>
                          <Badge variant={
                            feature.priority === 'high' ? 'default' :
                            feature.priority === 'medium' ? 'secondary' :
                            'outline'
                          }>
                            {feature.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10">
              <CardHeader>
                <CardTitle>Development Timeline</CardTitle>
                <CardDescription>Estimated development schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {proposal.timeline.map((phase, index) => (
                    <div key={index} className="relative pl-6 pb-6 last:pb-0">
                      <div className="absolute left-0 top-0 h-full w-[2px] bg-border">
                        <div className="absolute top-0 left-[-4px] h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <h4 className="font-medium">{phase.phase}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{phase.duration}</p>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {phase.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={handleRetry}
                disabled={isRetrying || isAccepting}
                className="flex-1 sm:flex-none"
              >
                {isRetrying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Regenerating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry Proposal
                  </>
                )}
              </Button>

              <Button
                onClick={handleAccept}
                disabled={isAccepting || isRetrying}
                className="flex-1 sm:flex-none bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                {isAccepting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Accepting...
                  </>
                ) : (
                  <>
                    Accept Proposal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}