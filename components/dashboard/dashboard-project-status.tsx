'use client';

import { Progress } from '@/components/ui/progress';
import { CheckIcon } from 'lucide-react';

interface MilestoneProps {
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'upcoming';
}

function Milestone({ title, date, status }: MilestoneProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div 
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            status === 'completed' 
              ? 'bg-primary border-primary text-primary-foreground' 
              : status === 'in-progress' 
                ? 'border-primary bg-primary/10' 
                : 'border-muted bg-muted/10'
          }`}
        >
          {status === 'completed' && <CheckIcon className="h-5 w-5" />}
        </div>
        <div className="w-0.5 h-12 bg-border mx-auto"></div>
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
}

export function DashboardProjectStatus() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span>Overall Progress</span>
          <span className="font-medium">40%</span>
        </div>
        <Progress value={40} className="h-2" />
      </div>

      <div className="space-y-6">
        <Milestone 
          title="Project Kickoff" 
          date="May 15, 2025" 
          status="completed" 
        />
        <Milestone 
          title="Design Approval" 
          date="May 30, 2025" 
          status="completed" 
        />
        <Milestone 
          title="Core Features Development" 
          date="June 20, 2025" 
          status="in-progress" 
        />
        <Milestone 
          title="Testing & Quality Assurance" 
          date="July 10, 2025" 
          status="upcoming" 
        />
        <Milestone 
          title="MVP Launch" 
          date="July 25, 2025" 
          status="upcoming" 
        />
      </div>
    </div>
  );
}