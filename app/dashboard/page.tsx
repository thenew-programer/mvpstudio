import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DashboardStats } from '@/components/dashboard/dashboard-stats';
import { DashboardRecentActivity } from '@/components/dashboard/dashboard-recent-activity';
import { DashboardProjectStatus } from '@/components/dashboard/dashboard-project-status';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your MVP project.
          </p>
        </div>
        <Link href="/dashboard/proposal">
          <Button>
            View Full Proposal <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <DashboardStats />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current progress of your MVP development</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardProjectStatus />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your project</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardRecentActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}