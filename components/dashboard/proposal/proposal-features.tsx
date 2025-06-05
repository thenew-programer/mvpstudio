import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Share2, BarChart, BookOpen, UserCog } from 'lucide-react';

const features = [
  {
    title: 'AI Chatbot',
    description: 'Intelligent conversational bot that handles common customer inquiries using natural language processing.',
    details: [
      'Natural language understanding for customer queries',
      'Contextual responses based on customer history',
      'Sentiment analysis to detect customer frustration',
      'Multi-language support for international customers',
      'Quick-reply suggestion system'
    ],
    priority: 'High',
    icon: Bot,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Integration Hub',
    description: 'Connect with existing business tools including CRMs, help desks, and e-commerce platforms.',
    details: [
      'API connections to popular platforms (Zendesk, Shopify, etc.)',
      'Data synchronization across connected systems',
      'Webhook support for custom event triggers',
      'OAuth authentication for secure connections',
      'Activity logs for integration monitoring'
    ],
    priority: 'High',
    icon: Share2,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Comprehensive data visualization of customer service performance and AI effectiveness.',
    details: [
      'Real-time metrics on response times and resolution rates',
      'Customer satisfaction trend analysis',
      'AI performance reporting',
      'Conversation volume forecasting',
      'Custom report builder'
    ],
    priority: 'Medium',
    icon: BarChart,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10'
  },
  {
    title: 'Knowledge Base Builder',
    description: 'Tool to create and maintain the information the AI uses to answer customer questions.',
    details: [
      'Document uploader for existing support content',
      'AI-assisted content suggestions',
      'Version control for knowledge articles',
      'Performance analytics per knowledge item',
      'Content gap identifier'
    ],
    priority: 'Medium',
    icon: BookOpen,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    title: 'Human Handoff System',
    description: 'Seamless transition from AI to human agents for complex customer issues.',
    details: [
      'Smart routing based on issue complexity and agent skills',
      'Full conversation context preservation',
      'Real-time agent availability monitoring',
      'Customizable handoff triggers',
      'Post-handoff feedback collection'
    ],
    priority: 'High',
    icon: UserCog,
    color: 'text-red-500',
    bg: 'bg-red-500/10'
  }
];

export function ProposalFeatures() {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Core Features</h3>
        <p className="text-muted-foreground">
          Based on your requirements, we've identified the following key features for your MVP:
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          
          return (
            <Card key={index} className="border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <div className={`${feature.bg} p-2 rounded-full`}>
                    <Icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <Badge variant={feature.priority === 'High' ? 'default' : 'secondary'}>
                    {feature.priority} Priority
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="text-sm font-medium mb-2">Included in MVP:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {feature.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}