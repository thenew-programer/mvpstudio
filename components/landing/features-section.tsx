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
    description: 'Describe your startup idea via text or voice, and our AI will analyze it to generate a comprehensive project proposal.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MessageSquare,
    title: 'Smart Recommendations',
    description: 'Receive personalized tech stack suggestions and feature recommendations based on your specific business needs.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Clock,
    title: 'Accurate Timeline Estimates',
    description: 'Get realistic development timelines broken down by milestone to help you plan your launch effectively.',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'View detailed cost breakdowns with no hidden fees, allowing you to budget appropriately for your MVP development.',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Secure Development Process',
    description: 'Your ideas and data are protected with enterprise-grade security throughout the entire development journey.',
    gradient: 'from-red-500 to-rose-500'
  },
  {
    icon: BarChart,
    title: 'Progress Tracking',
    description: 'Monitor your project\'s development in real-time with detailed analytics and milestone tracking.',
    gradient: 'from-indigo-500 to-purple-500'
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
              className="group relative"
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-card/50 to-card border rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                
                {/* Icon with gradient background */}
                <div className={`relative bg-gradient-to-br ${feature.gradient} rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Subtle border glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10 blur-xl`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}