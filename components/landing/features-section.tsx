'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    icon: MessageSquare,
    title: 'Smart Recommendations',
    description: 'Receive personalized tech stack suggestions and feature recommendations based on your specific business needs.',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Clock,
    title: 'Accurate Timeline Estimates',
    description: 'Get realistic development timelines broken down by milestone to help you plan your launch effectively.',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'View detailed cost breakdowns with no hidden fees, allowing you to budget appropriately for your MVP development.',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    icon: Shield,
    title: 'Secure Development Process',
    description: 'Your ideas and data are protected with enterprise-grade security throughout the entire development journey.',
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    icon: BarChart,
    title: 'Progress Tracking',
    description: 'Monitor your project\'s development in real-time with detailed analytics and milestone tracking.',
    gradient: 'from-indigo-500 to-purple-600'
  }
];

export function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  return (
    <section 
      id="features" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Cosmic background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-50px", "150px"]) }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
      />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="fade-up"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Everything You Need to Build Your{' '}
              <span className="text-cosmic">
                MVP
              </span>
            </motion.h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-xl text-slate-300 leading-relaxed">
              MVPForge combines AI technology with expert development to transform your ideas into functional products quickly and affordably.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.4 + index * 0.15,
                  ease: "easeOut"
                }
              } : {}}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative"
              data-aos="flip-up"
              data-aos-delay={index * 100}
            >
              <div className="relative overflow-hidden card-cosmic rounded-3xl p-8 h-full">
                {/* Cosmic gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                />
                
                {/* Animated icon */}
                <motion.div 
                  className={`relative bg-gradient-to-br ${feature.gradient} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 shadow-2xl`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                  
                  {/* Cosmic pulse effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-semibold mb-4 text-slate-100 group-hover:text-white transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-slate-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>
                
                {/* Cosmic border glow on hover */}
                <motion.div 
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`}
                  initial={false}
                  whileHover={{ opacity: 0.2 }}
                />

                {/* Floating cosmic particles */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${30 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}