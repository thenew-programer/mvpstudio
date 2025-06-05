import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FileTextIcon, MessageSquare, Code, CheckSquare } from 'lucide-react';

const activities = [
  {
    type: 'comment',
    message: 'Alex commented on your project',
    time: '2 hours ago',
    icon: MessageSquare,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10',
  },
  {
    type: 'update',
    message: 'Frontend authentication completed',
    time: '1 day ago',
    icon: CheckSquare,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10',
  },
  {
    type: 'code',
    message: 'New code pushed to repository',
    time: '2 days ago',
    icon: Code,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10',
  },
  {
    type: 'document',
    message: 'Project proposal updated',
    time: '5 days ago',
    icon: FileTextIcon,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10',
  },
];

export function DashboardRecentActivity() {
  return (
    <div className="space-y-6">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        
        return (
          <div key={index} className="flex gap-4">
            <div className={`${activity.iconBg} p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0`}>
              <Icon className={`h-5 w-5 ${activity.iconColor}`} />
            </div>
            <div className="space-y-1">
              <p className="text-sm">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}