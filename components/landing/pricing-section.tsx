'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter MVP',
    price: '$4,999',
    description: 'Perfect for validating your concept with a simple, focused MVP.',
    features: [
      'AI-generated project proposal',
      'Up to 5 core features',
      'Basic user authentication',
      'Simple database setup',
      '4-week development timeline',
      '30 days of post-launch support'
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    name: 'Growth MVP',
    price: '$9,999',
    description: 'Comprehensive solution for startups ready to attract users and investors.',
    features: [
      'Everything in Starter MVP',
      'Up to 10 advanced features',
      'Custom user roles and permissions',
      'API integrations (up to 3)',
      'Admin dashboard',
      'Payment processing',
      '8-week development timeline',
      '60 days of post-launch support'
    ],
    popular: true,
    cta: 'Choose Growth'
  },
  {
    name: 'Scale MVP',
    price: 'Custom',
    description: 'Tailored solution for complex ideas with specific technical requirements.',
    features: [
      'Everything in Growth MVP',
      'Unlimited features',
      'Advanced integrations',
      'Custom design system',
      'Scalable architecture',
      'Performance optimization',
      'Custom timeline',
      '90 days of post-launch support'
    ],
    popular: false,
    cta: 'Contact Us'
  }
];

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="pricing" 
      ref={ref}
      className="py-20 md:py-32"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Transparent Pricing
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground">
              Choose the perfect plan for your startup's needs with no hidden costs or surprises.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex"
            >
              <Card className={`w-full border ${plan.popular ? 'border-primary shadow-md relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                    {plan.price}
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/signup" className="w-full">
                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}