import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8 max-w-4xl">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h1>Privacy Policy</h1>
          
          <p>Last updated: May 15, 2025</p>

          <h2>1. Introduction</h2>
          <p>MVPForge ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.</p>

          <h2>2. Information We Collect</h2>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Account information (name, email address, password)</li>
            <li>Profile information (company name, role, industry)</li>
            <li>Project details and requirements</li>
            <li>Payment information</li>
            <li>Communications with us</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process your transactions</li>
            <li>Send you technical notices and support messages</li>
            <li>Communicate with you about products, services, and events</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            <li>Protect our rights and property</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>
          <p>We do not share your personal information except in the following circumstances:</p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and property</li>
            <li>In connection with a business transfer or acquisition</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Request restriction of processing</li>
            <li>Data portability</li>
          </ul>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>

          <h2>8. Children's Privacy</h2>
          <p>Our service is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13.</p>

          <h2>9. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>

          <h2>10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@mvpforge.com</p>
        </div>
      </div>
    </div>
  );
}