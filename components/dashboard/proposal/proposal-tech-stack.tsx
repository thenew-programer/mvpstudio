'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const frontendTech = [
  { name: 'React', type: 'UI Library', reason: 'Industry standard with large ecosystem and community support' },
  { name: 'Next.js', type: 'Framework', reason: 'For server-side rendering, static site generation, and API routes' },
  { name: 'TypeScript', type: 'Language', reason: 'Type safety to reduce errors and improve developer experience' },
  { name: 'Tailwind CSS', type: 'Styling', reason: 'Utility-first CSS for rapid UI development' },
  { name: 'Framer Motion', type: 'Animation', reason: 'For smooth, performant animations and transitions' },
  { name: 'ShadCN UI', type: 'Component Library', reason: 'Accessible component system for consistent design' },
];

const backendTech = [
  { name: 'Node.js', type: 'Runtime', reason: 'JavaScript runtime for building server-side applications' },
  { name: 'Express', type: 'Framework', reason: 'Minimal web framework for building APIs' },
  { name: 'Supabase', type: 'Backend', reason: 'For authentication, database, and storage' },
  { name: 'PostgreSQL', type: 'Database', reason: 'Robust relational database for structured data' },
  { name: 'Redis', type: 'Cache', reason: 'In-memory data store for caching and performance' },
  { name: 'OpenAI API', type: 'AI', reason: 'For natural language processing capabilities' },
];

const infraTech = [
  { name: 'Vercel', type: 'Hosting', reason: 'For frontend deployment with built-in CI/CD' },
  { name: 'Docker', type: 'Containerization', reason: 'For consistent development and deployment environments' },
  { name: 'GitHub Actions', type: 'CI/CD', reason: 'For automated testing and deployment workflows' },
  { name: 'Supabase Cloud', type: 'Backend Hosting', reason: 'Managed PostgreSQL and authentication service' },
  { name: 'Stripe', type: 'Payments', reason: 'For secure payment processing' },
  { name: 'Cloudflare', type: 'CDN/DNS', reason: 'For improved performance and security' },
];

const performanceData = [
  { name: 'Load Time', react: 1.8, angular: 2.3, vue: 1.9 },
  { name: 'First Input Delay', react: 70, angular: 100, vue: 80 },
  { name: 'Time to Interactive', react: 3.2, angular: 4.1, vue: 3.4 },
  { name: 'Memory Usage', react: 6.5, angular: 8.2, vue: 5.8 },
  { name: 'Bundle Size', react: 100, angular: 150, vue: 90 },
];

export function ProposalTechStack() {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Recommended Technology Stack</h3>
        <p className="text-muted-foreground">
          Based on your requirements for performance, scalability, and development speed, we've selected the following technologies:
        </p>
      </div>
      
      <Tabs defaultValue="frontend">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>
        
        <TabsContent value="frontend" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {frontendTech.map((tech, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{tech.name}</CardTitle>
                    <Badge variant="outline">{tech.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="backend" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {backendTech.map((tech, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{tech.name}</CardTitle>
                    <Badge variant="outline">{tech.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infraTech.map((tech, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{tech.name}</CardTitle>
                    <Badge variant="outline">{tech.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tech.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="pt-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Comparison</CardTitle>
            <CardDescription>Comparing core frontend frameworks for your use case</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="react" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="React" />
                  <Area type="monotone" dataKey="angular" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="Angular" />
                  <Area type="monotone" dataKey="vue" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} name="Vue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Based on performance metrics, React provides the best balance of speed, developer experience, and ecosystem support for your specific requirements.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}