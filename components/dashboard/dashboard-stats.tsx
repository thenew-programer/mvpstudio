import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, Code, CreditCard, Clock } from 'lucide-react';

const stats = [
  {
    title: 'Development Progress',
    value: '40%',
    description: 'MVP completion',
    icon: Code,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Remaining Time',
    value: '18 days',
    description: 'Until first milestone',
    icon: CalendarDays,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Total Hours',
    value: '67',
    description: 'Development hours logged',
    icon: Clock,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Budget Used',
    value: '$2,499',
    description: '50% of total budget',
    icon: CreditCard,
    gradient: 'from-amber-500 to-orange-500',
  },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card/50 to-card backdrop-blur-sm">
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {stat.description}
                  </p>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} rounded-xl w-12 h-12 flex items-center justify-center shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}