import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1>Terms of Service</h1>
          
          <p>Last updated: May 15, 2025</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using MVPForge ("the Service"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using the Service.</p>

          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily access the Service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained in the Service</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>

          <h2>3. Intellectual Property Rights</h2>
          <p>All intellectual property rights in relation to the Service and any content published on it are owned by MVPForge or its licensors. These works are protected by copyright laws and all such rights are reserved.</p>

          <h2>4. User Obligations</h2>
          <p>As a user of the Service, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information when creating an account</li>
            <li>Maintain the security of your account credentials</li>
            <li>Not use the Service for any illegal or unauthorized purpose</li>
            <li>Not interfere with or disrupt the integrity or performance of the Service</li>
          </ul>

          <h2>5. Payment Terms</h2>
          <p>Users agree to pay all fees or charges to their account based on the fees, charges, and billing terms in effect at the time a fee or charge is due and payable. All payment obligations are non-cancelable and fees paid are non-refundable.</p>

          <h2>6. Limitation of Liability</h2>
          <p>In no event shall MVPForge be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the Service.</p>

          <h2>7. Termination</h2>
          <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation.</p>

          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last updated" date of these terms.</p>

          <h2>9. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at support@mvpforge.com</p>
        </div>
      </div>
    </div>
  );
}