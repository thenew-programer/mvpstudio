'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

interface ProjectIdea {
  id: string;
  project_name: string;
  problem_statement: string;
  target_users: string;
  key_features: string[];
  status: string;
  created_at: string;
  user_email: string;
  feedback?: string;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [feedback, setFeedback] = useState<{ [key: string]: string }>({});

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('admin_project_ideas')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Error fetching projects');
      return;
    }

    setProjects(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateProjectStatus = async (projectId: string, status: string) => {
    const { error } = await supabase
      .from('project_ideas')
      .update({ 
        status,
        feedback: feedback[projectId]
      })
      .eq('id', projectId);

    if (error) {
      toast.error('Error updating project status');
      return;
    }

    toast.success(`Project ${status.toLowerCase()} successfully`);
    fetchProjects();
  };

  const filteredProjects = projects.filter(project => 
    statusFilter === 'all' ? true : project.status === statusFilter
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="pending">New</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.project_name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Submitted by {project.user_email} on{' '}
                    {new Date(project.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {project.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Problem Statement</h3>
                  <p className="text-muted-foreground">{project.problem_statement}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Target Users</h3>
                  <p className="text-muted-foreground">{project.target_users}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Key Features</h3>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {project.key_features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {project.status === 'pending' && (
                  <div className="space-y-4 pt-4 border-t">
                    <Textarea
                      placeholder="Add feedback or notes about this project..."
                      value={feedback[project.id] || ''}
                      onChange={(e) => setFeedback({
                        ...feedback,
                        [project.id]: e.target.value
                      })}
                    />
                    <div className="flex justify-end gap-4">
                      <Button
                        variant="outline"
                        onClick={() => updateProjectStatus(project.id, 'rejected')}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        onClick={() => updateProjectStatus(project.id, 'reviewed')}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                    </div>
                  </div>
                )}

                {project.feedback && (
                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Feedback</h3>
                    <p className="text-muted-foreground">{project.feedback}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">No projects found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}