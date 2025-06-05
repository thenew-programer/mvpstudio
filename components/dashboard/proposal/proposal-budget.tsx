'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const budgetBreakdown = [
  { name: 'Design', value: 1500 },
  { name: 'Frontend Development', value: 3000 },
  { name: 'Backend Development', value: 2500 },
  { name: 'AI Integration', value: 1200 },
  { name: 'Testing & QA', value: 800 },
  { name: 'Deployment & DevOps', value: 500 },
  { name: 'Project Management', value: 1500 },
];

const COLORS = [
  'hsl(var(--chart-1))', 
  'hsl(var(--chart-2))', 
  'hsl(var(--chart-3))', 
  'hsl(var(--chart-4))', 
  'hsl(var(--chart-5))',
  'hsl(var(--primary))',
  'hsl(var(--secondary))'
];

const paymentSchedule = [
  { milestone: 'Project Kickoff', amount: 4000, date: 'May 15, 2025', status: 'Paid' },
  { milestone: 'Design Approval', amount: 2000, date: 'June 5, 2025', status: 'Upcoming' },
  { milestone: 'Core Features Completion', amount: 3000, date: 'July 3, 2025', status: 'Upcoming' },
  { milestone: 'MVP Launch', amount: 2000, date: 'July 25, 2025', status: 'Upcoming' },
];

export function ProposalBudget() {
  const totalBudget = budgetBreakdown.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Budget Breakdown</h3>
        <p className="text-muted-foreground">
          The total estimated cost for your MVP development is <span className="font-semibold">${totalBudget.toLocaleString()}</span>. Below is a detailed breakdown of the budget allocation:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Budget Allocation</CardTitle>
            <CardDescription>Distribution of development costs by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {budgetBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Cost']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Detailed Cost Breakdown</CardTitle>
            <CardDescription>Itemized development costs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetBreakdown.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">${item.value.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">${totalBudget.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedule</CardTitle>
          <CardDescription>Milestone-based payment plan</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Milestone</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentSchedule.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.milestone}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell className="text-right">${payment.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Paid' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {payment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-bold">${totalBudget.toLocaleString()}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}