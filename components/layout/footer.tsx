import Link from 'next/link';
import { Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">MVPStudio</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming ideas into MVPs with AI-powered development.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Product</h3>
            <ul className="space-y-3">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Company</h3>
            <ul className="space-y-3">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-3">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MVPStudio. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <Link 
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}