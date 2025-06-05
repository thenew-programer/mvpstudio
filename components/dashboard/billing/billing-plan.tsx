import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const paymentSchedule = [
  {
    milestone: 'Project Kickoff',
    amount: 4000,
    percentage: 36,
    date: 'May 15, 2025',
    status: 'Due now',
    description: 'Initial setup, design phase, and project planning'
  },
  {
    milestone: 'Design Approval',
    amount: 2000,
    percentage: 18,
    date: 'June 5, 2025',
    status: 'Upcoming',
    description: 'UI/UX design completion and prototype approval'
  },
  {
    milestone: 'Core Features Completion',
    amount: 3000,
    percentage: 27,
    date: 'July 3, 2025',
    status: 'Upcoming',
    description: 'Main functionality development and integration'
  },
  {
    milestone: 'MVP Launch',
    amount: 2000,
    percentage: 18,
    date: 'July 25, 2025',
    status: 'Upcoming',
    description: 'Final testing, deployment, and launch'
  }
];

export function BillingPlan() {
  const totalAmount = paymentSchedule.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>Your milestone-based payment plan for the entire project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="font-medium">Total Project Cost</p>
                <p className="text-sm text-muted-foreground">Split across 4 milestones</p>
              </div>
              <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
            </div>
            
            <div className="space-y-6">
              {paymentSchedule.map((payment, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 ${
                    index < paymentSchedule.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{payment.milestone}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'Due now' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{payment.description}</p>
                    <p className="text-sm text-muted-foreground">Due: {payment.date}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-medium">${payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{payment.percentage}% of total</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download Invoice
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}