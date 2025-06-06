'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { ModeToggle } from '@/components/theme-toggle';
import { Rocket, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MVPStudio</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <ModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex">
        <aside className="hidden md:flex border-r bg-muted/40 w-64 flex-col">
          <DashboardNav />
        </aside>
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}