'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Rocket } from 'lucide-react';

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/60 dark:from-background dark:to-background/60 z-10" />
      
      {/* Radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-[120px] opacity-60" />

      <div className="container relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Turn Your Idea Into an MVP in 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Days, Not Months</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Simply describe your startup idea, and our AI will help transform it into a production-ready MVP. No coding required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
              <Mic className="mr-2 h-4 w-4" />
              Speak Your Idea
            </Button>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="px-8">
                Try It Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { title: '100+ MVPs Built', description: 'Proven track record of successful launches' },
            { title: '14 Days Average', description: 'From idea to working prototype' },
            { title: '90% Success Rate', description: 'Projects completed on time and budget' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm border rounded-lg p-6 text-center"
            >
              <h3 className="text-2xl font-bold mb-2">{stat.title}</h3>
              <p className="text-muted-foreground">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}