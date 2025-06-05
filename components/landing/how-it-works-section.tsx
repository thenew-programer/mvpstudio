'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { 
  Lightbulb, 
  Bot, 
  FileText, 
  Calendar, 
  CreditCard, 
  Code
} from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Describe Your Idea',
    description: 'Share your startup concept through our intuitive voice or text interface.',
    accent: 'bg-blue-500/10 text-blue-500'
  },
  {
    icon: Bot,
    title: 'AI Analysis',
    description: 'Our AI processes your idea and identifies the key components needed for your MVP.',
    accent: 'bg-purple-500/10 text-purple-500'
  },
  {
    icon: FileText,
    title: 'Proposal Generation',
    description: 'Receive a comprehensive project proposal with scope, tech stack, and feature recommendations.',
    accent: 'bg-teal-500/10 text-teal-500'
  },
  {
    icon: Calendar,
    title: 'Timeline Planning',
    description: 'Review the estimated development schedule broken down by milestone.',
    accent: 'bg-amber-500/10 text-amber-500'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Choose your preferred payment plan and securely fund your MVP development.',
    accent: 'bg-green-500/10 text-green-500'
  },
  {
    icon: Code,
    title: 'Development Kickoff',
    description: 'Our team begins building your MVP with regular updates and progress tracking.',
    accent: 'bg-red-500/10 text-red-500'
  }
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="how-it-works" 
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
              How MVPForge Works
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground">
              Our streamlined process takes you from idea to MVP in just six simple steps.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative md:grid md:grid-cols-2 md:gap-8 items-center ${index % 2 === 0 ? '' : 'md:rtl'}`}
              >
                {/* Timeline circle */}
                <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card border-4 border-background z-10" />
                
                <div className={`md:text-right ${index % 2 !== 0 ? 'md:ltr' : ''}`}>
                  <div className="flex items-center md:justify-end mb-4">
                    <div className={`${step.accent} w-10 h-10 rounded-full flex items-center justify-center mr-3 md:mr-0 md:ml-3 md:order-2`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-medium">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                <div className="hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}