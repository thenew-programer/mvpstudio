'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Users, 
  BarChart, 
  Bell, 
  Search,
  AlertCircle,
  CheckCircle, 
  Clock,
  XCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

interface SystemLog {
  id: string;
  event_type: string;
  description: string;
  created_at: string;
}

interface AdminNotification {
  id: string;
  title: string;
  message: string;
  priority: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    pendingReview: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      // Fetch projects
      const { data: projectsData } = await supabase
        .from('admin_project_ideas')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch system logs
      const { data: logsData } = await supabase
        .from('system_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch notifications
      const { data: notificationsData } = await supabase
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch stats
      const { data: statsData } = await supabase
        .from('project_stats')
        .select('*')
        .single();

      if (projectsData) setProjects(projectsData);
      if (logsData) setLogs(logsData);
      if (notificationsData) setNotifications(notificationsData);
      if (statsData) {
        setStats({
          totalProjects: statsData.total_projects,
          activeProjects: statsData.active_projects,
          completedProjects: statsData.completed_projects,
          pendingReview: statsData.pending_review
        });
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to load admin dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateProjectStatus = async (projectId: string, status: string, feedback?: string) => {
    try {
      const { error } = await supabase
        .from('project_ideas')
        .update({ 
          status,
          feedback 
        })
        .eq('id', projectId);

      if (error) throw error;

      toast.success(`Project ${status.toLowerCase()} successfully`);
      fetchData();
    } catch (error) {
      console.error('Error updating project status:', error);
      toast.error('Failed to update project status');
    }
  };

  const markNotificationRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

      if (error) throw error;

      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast.error('Failed to update notification');
    }
  };

  const filteredProjects = projects.filter(project => 
    (statusFilter === 'all' || project.status === statusFilter) &&
    (project.project_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     project.user_email.toLowerCase().includes(searchQuery.toLowerCase()))
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
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => fetchData()}>
          Refresh Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReview}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Management</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search projects..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{project.project_name}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            Submitted by {project.user_email} on{' '}
                            {new Date(project.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge
                          variant={
                            project.status === 'approved' ? 'default' :
                            project.status === 'rejected' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {project.status}
                        </Badge>
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
                          <div className="flex justify-end gap-4 pt-4">
                            <Button
                              variant="outline"
                              onClick={() => updateProjectStatus(project.id, 'rejected')}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </Button>
                            <Button
                              onClick={() => updateProjectStatus(project.id, 'approved')}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredProjects.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No projects found matching your criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border rounded-lg"
                  >
                    <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{log.event_type}</p>
                      <p className="text-sm text-muted-foreground">{log.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(log.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 border rounded-lg ${
                      notification.is_read ? 'opacity-60' : ''
                    }`}
                  >
                    <Bell className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                        </div>
                        {!notification.is_read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markNotificationRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No new notifications
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}