import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProposalSummary() {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Project Overview</h3>
        <p className="text-muted-foreground">
          Based on your input, we've designed a comprehensive SaaS platform that helps small business owners automate their customer service using AI. The platform will integrate with existing tools while providing valuable insights about customer satisfaction.
        </p>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Key Business Goals</h3>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Reduce customer service response times by 70%</li>
          <li>Automate handling of routine customer inquiries</li>
          <li>Integrate with popular CRM and help desk systems</li>
          <li>Provide actionable insights from customer interactions</li>
          <li>Scale customer support without increasing headcount</li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Target Audience</h3>
        <p className="text-muted-foreground">
          Small to medium-sized businesses (10-250 employees) across e-commerce, SaaS, and service industries that want to improve customer service efficiency while maintaining high satisfaction rates.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Customer service managers looking to optimize their team</li>
          <li>Business owners seeking to reduce operational costs</li>
          <li>Companies experiencing growth with limited support resources</li>
        </ul>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Proposed Solution</h3>
        <p className="text-muted-foreground">
          An AI-powered customer service platform with the following components:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>AI chatbot for handling common customer inquiries</li>
          <li>Integration hub for connecting with existing business tools</li>
          <li>Analytics dashboard for monitoring performance and satisfaction</li>
          <li>Knowledge base builder for training the AI on company-specific information</li>
          <li>Human handoff system for complex issues that require personal attention</li>
        </ul>
      </div>
      
      <div className="mt-6 flex justify-end">
        <Link href="/dashboard/proposal?tab=features">
          <button className="text-primary hover:underline flex items-center">
            View Detailed Features <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </Link>
      </div>
    </div>
  );
}