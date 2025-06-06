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
      {/* Top Banner */}
      <div className="bg-muted/50 border-b px-4 py-2">
        <div className="container flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>hello@mvpstudio.com</span>
          </div>
          <div className="flex items-center">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-sm">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={cn(
          'w-full bg-background sticky top-0 z-50',
          isScrolled && 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b'
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">MVPStudio</span>
          </Link>
          
          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              {routes.map((route) => (
                <Link 
                  key={route.path}
                  href={route.path}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right Side - Get Started Button */}
          <div className="hidden md:flex items-center">
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
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
          <div className="md:hidden bg-background border-t">
            <div className="container py-4 flex flex-col space-y-4">
              {routes.map((route) => (
                <Link 
                  key={route.path}
                  href={route.path}
                  className="text-sm font-medium py-2 transition-colors hover:text-primary"
                >
                  {route.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
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