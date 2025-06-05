import Link from 'next/link';
import { Rocket } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-12 md:py-16 flex flex-col items-center text-center">
        <div className="flex items-center space-x-2 mb-8">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MVPStudio</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-2xl mx-auto mb-12">
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

          <div>
            <h3 className="font-medium text-sm mb-4">Social</h3>
            <ul className="space-y-3">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                <li key={social}>
                  <Link 
                    href={`https://${social.toLowerCase()}.com`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} MVPStudio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}