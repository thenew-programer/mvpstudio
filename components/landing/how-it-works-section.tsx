'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  Lightbulb, 
  Bot, 
  FileText, 
  Calendar, 
  CreditCard, 
  Code,
  ArrowDown
} from 'lucide-react';

const steps = [
  {
    icon: Lightbulb,
    title: 'Describe Your Idea',
    description: 'Share your startup concept through our intuitive voice or text interface.',
    accent: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Bot,
    title: 'AI Analysis',
    description: 'Our AI processes your idea and identifies the key components needed for your MVP.',
    accent: 'from-purple-500 to-pink-500'
  },
  {
    icon: FileText,
    title: 'Proposal Generation',
    description: 'Receive a comprehensive project proposal with scope, tech stack, and feature recommendations.',
    accent: 'from-green-500 to-emerald-500'
  },
  {
    icon: Calendar,
    title: 'Timeline Planning',
    description: 'Review the estimated development schedule broken down by milestone.',
    accent: 'from-amber-500 to-orange-500'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Choose your preferred payment plan and securely fund your MVP development.',
    accent: 'from-red-500 to-rose-500'
  },
  {
    icon: Code,
    title: 'Development Kickoff',
    description: 'Our team begins building your MVP with regular updates and progress tracking.',
    accent: 'from-indigo-500 to-purple-500'
  }
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section 
      id="how-it-works" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], ["0px", "200px"]),
            rotate: useTransform(scrollYProgress, [0, 1], [0, 45])
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MVPForge
              </span>
              {' '}Works
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our streamlined process takes you from idea to MVP in just six simple steps.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 2 100" preserveAspectRatio="none">
              <motion.path
                d="M1,0 L1,100"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                style={{ pathLength }}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { 
                  opacity: 1, 
                  x: 0,
                  transition: {
                    duration: 0.8,
                    delay: 0.3 + index * 0.2,
                    ease: "easeOut"
                  }
                } : {}}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                  index % 2 === 0 ? '' : 'md:rtl md:text-right'
                }`}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                data-aos-delay={index * 150}
              >
                {/* Timeline circle */}
                <motion.div 
                  className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { 
                    scale: 1, 
                    rotate: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.5 + index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }
                  } : {}}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-2xl border-4 border-background`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Pulse effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.accent}`}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
                
                <div className={`${index % 2 !== 0 ? 'md:ltr md:text-left' : ''}`}>
                  <motion.div 
                    className="group relative overflow-hidden bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500"
                    whileHover={{ 
                      scale: 1.02,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                    
                    <div className="flex items-center md:justify-start mb-6">
                      <motion.div 
                        className={`${step.accent} bg-gradient-to-br rounded-2xl w-14 h-14 flex items-center justify-center mr-4 shadow-lg md:hidden`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <step.icon className="h-7 w-7 text-white" />
                      </motion.div>
                      <div>
                        <motion.div
                          className="text-sm font-medium text-primary mb-1"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                        >
                          Step {index + 1}
                        </motion.div>
                        <motion.h3 
                          className="text-2xl font-bold"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          {step.title}
                        </motion.h3>
                      </div>
                    </div>
                    
                    <motion.p 
                      className="text-muted-foreground leading-relaxed text-lg"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Arrow for next step */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 md:hidden"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowDown className="h-6 w-6 text-primary/50" />
                      </motion.div>
                    )}
                  </motion.div>
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