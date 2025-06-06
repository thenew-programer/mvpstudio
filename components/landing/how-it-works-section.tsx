'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    accent: 'from-violet-500 to-purple-600'
  },
  {
    icon: Bot,
    title: 'AI Analysis',
    description: 'Our AI processes your idea and identifies the key components needed for your MVP.',
    accent: 'from-blue-500 to-cyan-600'
  },
  {
    icon: FileText,
    title: 'Proposal Generation',
    description: 'Receive a comprehensive project proposal with scope, tech stack, and feature recommendations.',
    accent: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Calendar,
    title: 'Timeline Planning',
    description: 'Review the estimated development schedule broken down by milestone.',
    accent: 'from-amber-500 to-orange-600'
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Choose your preferred payment plan and securely fund your MVP development.',
    accent: 'from-rose-500 to-pink-600'
  },
  {
    icon: Code,
    title: 'Development Kickoff',
    description: 'Our team begins building your MVP with regular updates and progress tracking.',
    accent: 'from-indigo-500 to-purple-600'
  }
];

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="how-it-works" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How{' '}
              <span className="text-cosmic">
                MVPForge
              </span>
              {' '}Works
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xl text-slate-300 leading-relaxed">
              Our streamlined process takes you from idea to MVP in just six simple steps.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Cosmic timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-violet-500/30 via-blue-500/30 to-purple-500/30 hidden md:block" />

          {/* Steps with cosmic alternating layout */}
          <div className="space-y-16 md:space-y-20">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.1 + index * 0.1
                    }
                  } : {}}
                  className="relative"
                >
                  {/* Desktop Layout - Clear Left/Right Alternating */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-12 gap-8 items-center">
                      {/* Left side content (for even indices) */}
                      {isLeft && (
                        <div className="col-span-4 col-start-1">
                          <div className="card-cosmic rounded-2xl p-8 hover:bg-slate-800/70 transition-colors duration-300">
                            <div className="flex items-center mb-4">
                              <div className={`bg-gradient-to-br ${step.accent} rounded-xl w-12 h-12 flex items-center justify-center mr-4 shadow-lg`}>
                                <step.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-violet-400 mb-1">
                                  Step {index + 1}
                                </div>
                                <h3 className="text-xl font-bold text-slate-100">
                                  {step.title}
                                </h3>
                              </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Center Timeline Circle */}
                      <div className="col-span-4 flex justify-center">
                        <div className="relative z-10">
                          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center border-4 border-slate-900 shadow-2xl animate-pulse-glow`}>
                            <step.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Right side content (for odd indices) - moved further right */}
                      {!isLeft && (
                        <div className="col-span-4 col-start-9 relative">
                          {/* Icon positioned on top of the timeline */}
                          <div className="absolute -left-20 top-8 z-20">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.accent} flex items-center justify-center border-4 border-slate-900 shadow-2xl animate-pulse-glow`}>
                              <step.icon className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          
                          <div className="card-cosmic rounded-2xl p-8 hover:bg-slate-800/70 transition-colors duration-300">
                            <div className="mb-4">
                              <div className="text-sm font-medium text-violet-400 mb-1">
                                Step {index + 1}
                              </div>
                              <h3 className="text-xl font-bold text-slate-100">
                                {step.title}
                              </h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Layout - Stacked */}
                  <div className="block md:hidden">
                    <div className="card-cosmic rounded-2xl p-8 hover:bg-slate-800/70 transition-colors duration-300">
                      <div className="flex items-center mb-4">
                        <div className={`bg-gradient-to-br ${step.accent} rounded-xl w-12 h-12 flex items-center justify-center mr-4 shadow-lg`}>
                          <step.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-violet-400 mb-1">
                            Step {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-slate-100">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}