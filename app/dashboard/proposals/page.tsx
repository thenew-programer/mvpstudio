'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Proposal {
  id: string;
  summary: string;
  cost_estimate: number;
  created_at: string;
  status: string;
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProposals = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('proposals')
        .select(`
          id,
          summary,
          cost_estimate,
          created_at,
          project_ideas (status)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching proposals:', error);
        return;
      }

      setProposals(data || []);
      setIsLoading(false);
    };

    fetchProposals();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Proposals</h1>
          <p className="text-muted-foreground">Review and manage your project proposals</p>
        </div>
        <Link href="/submit-idea">
          <Button>
            New Proposal <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {proposals.map((proposal) => (
          <Card key={proposal.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">Project Proposal</CardTitle>
                  <CardDescription>
                    Created on {new Date(proposal.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Button variant="outline">View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{proposal.summary}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Estimated Cost</p>
                    <p className="text-2xl font-bold">${proposal.cost_estimate.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      {proposal.status}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {proposals.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">No proposals yet</p>
              <Link href="/submit-idea">
                <Button>Create Your First Proposal</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}