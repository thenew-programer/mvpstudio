import { ReactNode } from 'react';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { UserNav } from '@/components/dashboard/user-nav';
import { ModeToggle } from '@/components/theme-toggle';
import { Rocket } from 'lucide-react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MVPForge</span>
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