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
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled 
          ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MVPStudio</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-10">
            {routes.map((route) => (
              <Link 
                key={route.path}
                href={route.path}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {route.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

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
  );
}