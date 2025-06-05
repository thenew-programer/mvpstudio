'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const timelineData = [
  {
    phase: 'Discovery & Planning',
    duration: '1 week',
    startDate: 'May 15, 2025',
    endDate: 'May 22, 2025',
    tasks: [
      'Detailed requirements gathering',
      'User stories and acceptance criteria',
      'Technical architecture planning',
      'Project roadmap creation'
    ],
    status: 'Completed'
  },
  {
    phase: 'Design & Prototyping',
    duration: '2 weeks',
    startDate: 'May 23, 2025',
    endDate: 'June 5, 2025',
    tasks: [
      'UI/UX design for all interfaces',
      'Interactive prototype creation',
      'Design system implementation',
      'Stakeholder design review'
    ],
    status: 'In Progress'
  },
  {
    phase: 'Core Development',
    duration: '4 weeks',
    startDate: 'June 6, 2025',
    endDate: 'July 3, 2025',
    tasks: [
      'Frontend development (UI components)',
      'Backend API development',
      'Database schema implementation',
      'AI integration',
      'Authentication system'
    ],
    status: 'Upcoming'
  },
  {
    phase: 'Integration & Testing',
    duration: '2 weeks',
    startDate: 'July 4, 2025',
    endDate: 'July 17, 2025',
    tasks: [
      'Third-party service integrations',
      'End-to-end testing',
      'Performance optimization',
      'Security auditing',
      'Bug fixes'
    ],
    status: 'Upcoming'
  },
  {
    phase: 'Deployment & Launch',
    duration: '1 week',
    startDate: 'July 18, 2025',
    endDate: 'July 25, 2025',
    tasks: [
      'Production environment setup',
      'Data migration',
      'Deployment automation',
      'Launch preparation',
      'Post-launch monitoring'
    ],
    status: 'Upcoming'
  }
];

const ganttData = timelineData.map((item, index) => ({
  name: item.phase,
  start: index * 2,
  duration: item.phase === 'Core Development' ? 4 : item.phase === 'Design & Prototyping' || item.phase === 'Integration & Testing' ? 2 : 1,
  status: item.status
}));

export function ProposalTimeline() {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Development Timeline</h3>
        <p className="text-muted-foreground">
          Your MVP is estimated to take 10 weeks to complete. Below is the breakdown of development phases and key milestones:
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Project Timeline Overview</CardTitle>
          <CardDescription>Estimated duration: 10 weeks (May 15 - July 25, 2025)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={ganttData}
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} tickCount={11} />
                <YAxis dataKey="name" type="category" />
                <Tooltip 
                  formatter={(value, name) => [`${value} weeks`, name === 'duration' ? 'Duration' : 'Start']}
                  labelFormatter={(value) => ganttData[value].name}
                />
                <Bar 
                  dataKey="duration" 
                  stackId="a" 
                  fill={(entry) => {
                    if (entry.status === 'Completed') return "hsl(var(--chart-2))";
                    if (entry.status === 'In Progress') return "hsl(var(--chart-1))";
                    return "hsl(var(--chart-3))";
                  }}
                  name="Duration" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-6 pt-4">
        {timelineData.map((phase, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{phase.phase}</CardTitle>
                <Badge variant={
                  phase.status === 'Completed' ? 'default' : 
                  phase.status === 'In Progress' ? 'secondary' : 
                  'outline'
                }>
                  {phase.status}
                </Badge>
              </div>
              <CardDescription>
                {phase.duration} ({phase.startDate} - {phase.endDate})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                {phase.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}