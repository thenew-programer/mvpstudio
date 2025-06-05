'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export interface ProposalProps {
  proposal: {
    summary: string;
    techStack: {
      frontend: string[];
      backend: string[];
      infrastructure: string[];
    };
    features: {
      name: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
    }[];
    timeline: {
      phase: string;
      duration: string;
      tasks: string[];
    }[];
    costEstimate: number;
  };
}

export function Proposal({ proposal }: ProposalProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="space-y-6"
    >
      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle>MVP Summary</CardTitle>
            <CardDescription>{proposal.summary}</CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Tech Stack</CardTitle>
            <CardDescription>Recommended technologies for your MVP</CardDescription>
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
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card>
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
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle>Development Timeline</CardTitle>
            <CardDescription>Estimated {proposal.timeline.reduce((acc, phase) => acc + parseInt(phase.duration), 0)} weeks total</CardDescription>
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
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex}>{task}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn}>
        <Card>
          <CardHeader>
            <CardTitle>Cost Estimate</CardTitle>
            <CardDescription>Total investment required for your MVP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${proposal.costEstimate.toLocaleString()}</div>
            <p className="text-muted-foreground mt-2">Includes development, testing, and deployment</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={fadeIn} className="flex justify-end">
        <Link href="/dashboard">
          <Button size="lg">
            Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}