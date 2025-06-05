'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProposalSummary } from '@/components/dashboard/proposal/proposal-summary';
import { ProposalFeatures } from '@/components/dashboard/proposal/proposal-features';
import { ProposalTechStack } from '@/components/dashboard/proposal/proposal-tech-stack';
import { ProposalTimeline } from '@/components/dashboard/proposal/proposal-timeline';
import { ProposalBudget } from '@/components/dashboard/proposal/proposal-budget';
import { ProposalApproval } from '@/components/dashboard/proposal/proposal-approval';

export default function ProposalPage() {
  const [currentTab, setCurrentTab] = useState('summary');
  
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Project Proposal</h1>
        <p className="text-muted-foreground">
          Review your AI-generated project proposal and approve to begin development.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>SaaS Platform MVP Proposal</CardTitle>
          <CardDescription>Generated on May 15, 2025 • Last updated 2 days ago</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="summary" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
              <TabsTrigger value="approval">Approval</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <ProposalSummary />
            </TabsContent>
            <TabsContent value="features">
              <ProposalFeatures />
            </TabsContent>
            <TabsContent value="tech-stack">
              <ProposalTechStack />
            </TabsContent>
            <TabsContent value="timeline">
              <ProposalTimeline />
            </TabsContent>
            <TabsContent value="budget">
              <ProposalBudget />
            </TabsContent>
            <TabsContent value="approval">
              <ProposalApproval />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={() => {
            const tabs = ['summary', 'features', 'tech-stack', 'timeline', 'budget', 'approval'];
            const currentIndex = tabs.indexOf(currentTab);
            if (currentIndex > 0) {
              setCurrentTab(tabs[currentIndex - 1]);
            }
          }}
          disabled={currentTab === 'summary'}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            const tabs = ['summary', 'features', 'tech-stack', 'timeline', 'budget', 'approval'];
            const currentIndex = tabs.indexOf(currentTab);
            if (currentIndex < tabs.length - 1) {
              setCurrentTab(tabs[currentIndex + 1]);
            }
          }}
          disabled={currentTab === 'approval'}
        >
          Next
        </Button>
      </div>
    </div>
  );
}