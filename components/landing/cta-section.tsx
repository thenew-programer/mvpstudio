'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Rocket } from 'lucide-react';

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const floatingIcons = [
    { icon: Sparkles, delay: 0, x: "10%", y: "20%", gradient: "from-violet-400 to-purple-600" },
    { icon: Zap, delay: 0.5, x: "85%", y: "30%", gradient: "from-blue-400 to-cyan-600" },
    { icon: Rocket, delay: 1, x: "15%", y: "70%", gradient: "from-emerald-400 to-teal-600" },
  ];

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Cosmic animated background */}
      <motion.div
        style={{ y }}
        className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-50px", "200px"]) }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
      />

      {/* Floating cosmic icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { 
            opacity: [0.2, 0.6, 0.2], 
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <div className={`bg-gradient-to-br ${item.gradient} rounded-full p-4 shadow-2xl animate-pulse-glow`}>
            <item.icon className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      ))}

      <div className="container relative">
        <motion.div 
          className="relative overflow-hidden rounded-3xl card-cosmic text-slate-100"
          initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
          animate={isInView ? { 
            opacity: 1, 
            scale: 1, 
            rotateX: 0,
            transition: {
              duration: 1,
              ease: "easeOut"
            }
          } : {}}
          whileHover={{ 
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          data-aos="zoom-in"
        >
          {/* Cosmic animated background pattern */}
          <div className="absolute inset-0">
            <motion.div 
              className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"
              animate={{ 
                backgroundPosition: ["0px 0px", "40px 40px"],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Floating cosmic particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
          
          <div className="relative py-16 px-8 md:py-24 md:px-16 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2 
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(139,92,246,0.5)",
                    "0 0 40px rgba(139,92,246,0.8)",
                    "0 0 20px rgba(139,92,246,0.5)"
                  ]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity
                }}
              >
                Ready to Build Your{' '}
                <span className="text-cosmic">MVP</span>?
              </motion.h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-xl md:text-2xl mb-10 text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Start your journey from idea to launch today. Let MVPForge help you build the perfect MVP to validate your concept and attract users.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Link href="/signup">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="px-10 py-4 text-lg font-semibold bg-white text-slate-900 hover:bg-slate-100 shadow-2xl hover:shadow-white/25 transition-all duration-300 rounded-2xl"
                  >
                    Get Started 
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}