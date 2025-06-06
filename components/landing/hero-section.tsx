'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Rocket, Sparkles, Zap } from 'lucide-react';

export function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingIcons = [
    { icon: Sparkles, delay: 0, x: "10%", y: "20%" },
    { icon: Zap, delay: 0.5, x: "80%", y: "30%" },
    { icon: Rocket, delay: 1, x: "15%", y: "70%" },
    { icon: Mic, delay: 1.5, x: "85%", y: "60%" },
  ];

  return (
    <section ref={targetRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y: ySpring }}
          className="absolute inset-0 bg-gradient-to-b from-background to-background/60 dark:from-background dark:to-background/60"
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Interactive gradient that follows mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.3, 0.7, 0.3], 
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <div className="bg-gradient-to-br from-primary to-secondary rounded-full p-3 shadow-lg">
            <item.icon className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      ))}

      <div className="container relative z-20">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Turn Your Idea Into an MVP in{' '}
              <motion.span 
                className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                Days, Not Months
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Simply describe your startup idea, and our AI will help transform it into a production-ready MVP. No coding required.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Mic className="mr-3 h-5 w-5" />
                </motion.div>
                Speak Your Idea
              </Button>
            </motion.div>
            
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  Try It Free 
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
        </motion.div>

        {/* Stats section with staggered animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          {[
            { title: '100+ MVPs Built', description: 'Proven track record of successful launches', gradient: 'from-blue-500 to-cyan-500' },
            { title: '14 Days Average', description: 'From idea to working prototype', gradient: 'from-purple-500 to-pink-500' },
            { title: '90% Success Rate', description: 'Projects completed on time and budget', gradient: 'from-green-500 to-emerald-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative"
              data-aos="zoom-in"
              data-aos-delay={800 + index * 100}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center shadow-2xl">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
                
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold mb-3"
                  animate={{ 
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{
                    background: `linear-gradient(45deg, ${stat.gradient.split(' ')[0].replace('from-', '')}, ${stat.gradient.split(' ')[1].replace('to-', '')})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {stat.title}
                </motion.h3>
                <p className="text-muted-foreground leading-relaxed">{stat.description}</p>
                
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}