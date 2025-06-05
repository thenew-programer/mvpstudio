'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Rocket, Menu, X } from 'lucide-react';

const routes = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/#features' },
  { name: 'How It Works', path: '/#how-it-works' },
  { name: 'Pricing', path: '/#pricing' },
  { name: 'FAQ', path: '/#faq' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div>
      <div className="bg-primary px-4 py-2 text-primary-foreground text-center text-sm">
        🎉 Introducing AI-powered project scoping - Get instant MVP estimates and technical specifications
      </div>
      <header 
        className={cn(
          'w-full bg-background border-b',
          isScrolled && 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MVPStudio</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {routes.map((route) => (
              <Link 
                key={route.path}
                href={route.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {route.name}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </nav>

          <button 
            className="flex md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-b bg-background">
            <div className="container py-4 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link 
                  key={route.path}
                  href={route.path}
                  className="text-sm font-medium py-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  {route.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/login">
                  <Button variant="ghost" className="w-full justify-start">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button className="w-full justify-start">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}