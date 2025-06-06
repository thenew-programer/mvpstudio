'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown } from 'lucide-react';

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
    cta: 'Get Started',
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500'
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
    cta: 'Choose Growth',
    icon: Star,
    gradient: 'from-purple-500 to-pink-500'
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
    cta: 'Contact Us',
    icon: Crown,
    gradient: 'from-amber-500 to-orange-500'
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
              className="flex relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`bg-gradient-to-r ${plan.gradient} text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg`}>
                    Most Popular
                  </div>
                </div>
              )}
              
              <Card className={`w-full relative overflow-hidden group hover:shadow-2xl transition-all duration-300 ${
                plan.popular 
                  ? 'border-2 border-primary shadow-xl scale-105' 
                  : 'border hover:border-primary/50 hover:-translate-y-1'
              }`}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`bg-gradient-to-br ${plan.gradient} rounded-xl w-12 h-12 flex items-center justify-center shadow-lg`}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    {plan.popular && (
                      <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Recommended
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted-foreground ml-1">/project</span>}
                  </div>
                  <CardDescription className="mt-4 text-base leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-3 mt-0.5">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="relative">
                  <Link href="/signup" className="w-full">
                    <Button 
                      variant={plan.popular ? "default" : "outline"} 
                      className={`w-full h-12 text-base font-semibold ${
                        plan.popular 
                          ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 border-0 text-white shadow-lg` 
                          : 'hover:bg-primary hover:text-primary-foreground'
                      }`}
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