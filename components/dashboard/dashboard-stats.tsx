import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Code, CreditCard, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Development Progress',
    value: '40%',
    description: 'MVP completion',
    icon: Code,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    title: 'Remaining Time',
    value: '18 days',
    description: 'Until first milestone',
    icon: CalendarDays,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
  },
  {
    title: 'Total Hours',
    value: '67',
    description: 'Development hours logged',
    icon: Clock,
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-500/10',
  },
  {
    title: 'Budget Used',
    value: '$2,499',
    description: '50% of total budget',
    icon: CreditCard,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={`${stat.iconBg} p-2 rounded-full`}>
                  <Icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}