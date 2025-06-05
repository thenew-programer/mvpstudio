'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Sparkles, 
  MessageSquare, 
  Clock, 
  DollarSign, 
  Shield, 
  BarChart 
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Idea Processing',
    description: 'Describe your startup idea via text or voice, and our AI will analyze it to generate a comprehensive project proposal.'
  },
  {
    icon: MessageSquare,
    title: 'Smart Recommendations',
    description: 'Receive personalized tech stack suggestions and feature recommendations based on your specific business needs.'
  },
  {
    icon: Clock,
    title: 'Accurate Timeline Estimates',
    description: 'Get realistic development timelines broken down by milestone to help you plan your launch effectively.'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'View detailed cost breakdowns with no hidden fees, allowing you to budget appropriately for your MVP development.'
  },
  {
    icon: Shield,
    title: 'Secure Development Process',
    description: 'Your ideas and data are protected with enterprise-grade security throughout the entire development journey.'
  },
  {
    icon: BarChart,
    title: 'Progress Tracking',
    description: 'Monitor your project\'s development in real-time with detailed analytics and milestone tracking.'
  }
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="features" 
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
              Everything You Need to Build Your MVP
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground">
              MVPForge combines AI technology with expert development to transform your ideas into functional products quickly and affordably.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-card border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}