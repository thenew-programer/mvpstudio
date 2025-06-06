'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Sparkles, Zap, Star } from 'lucide-react';

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
    { icon: Sparkles, delay: 0, x: "15%", y: "25%" },
    { icon: Zap, delay: 0.5, x: "85%", y: "20%" },
    { icon: Star, delay: 1, x: "10%", y: "75%" },
    { icon: Mic, delay: 1.5, x: "90%", y: "70%" },
  ];

  return (
    <section ref={targetRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Luxurious animated background */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y: ySpring }}
          className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"
        />
        
        {/* Premium mesh gradient */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 opacity-30" />
          <div className="absolute top-1/4 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-secondary/15 via-transparent to-primary/15 opacity-40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-50 rounded-full blur-2xl" />
        </div>

        {/* Elegant floating particles */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Interactive luxury gradient that follows mouse */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 blur-3xl"
          animate={{
            x: mousePosition.x - 300,
            y: mousePosition.y - 300,
          }}
          transition={{ type: "spring", stiffness: 30, damping: 40 }}
        />
      </div>

      {/* Sophisticated floating icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4], 
            scale: [0.8, 1.1, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl">
            <item.icon className="h-6 w-6 text-primary" />
          </div>
        </motion.div>
      ))}

      <div className="container relative z-20">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Premium hero content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Transform Ideas Into{' '}
              <motion.span 
                className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient relative"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                Reality
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-2xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Experience the future of MVP development with our AI-powered platform. 
              <span className="text-foreground font-medium"> No coding required.</span>
            </p>
          </motion.div>

          {/* Premium CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-2xl hover:shadow-primary/25 transition-all duration-500 rounded-2xl border-0 relative overflow-hidden group"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
                
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10"
                >
                  <Mic className="mr-3 h-6 w-6" />
                </motion.div>
                <span className="relative z-10">Speak Your Vision</span>
              </Button>
            </motion.div>
            
            <Link href="/signup">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-10 py-6 text-lg font-semibold border-2 border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-primary/50 transition-all duration-500 rounded-2xl relative overflow-hidden group"
                >
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <span className="relative z-10">Start Building</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative z-10"
                  >
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Elegant trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-12 text-center"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            {[
              { metric: "100+", label: "MVPs Delivered", sublabel: "Proven Excellence" },
              { metric: "14", label: "Days Average", sublabel: "Lightning Fast" },
              { metric: "90%", label: "Success Rate", sublabel: "Guaranteed Quality" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="group"
                data-aos="zoom-in"
                data-aos-delay={900 + index * 150}
              >
                <div className="relative">
                  <motion.div 
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                    animate={{ 
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {item.metric}
                  </motion.div>
                  <div className="text-lg font-semibold text-foreground mb-1">{item.label}</div>
                  <div className="text-sm text-muted-foreground font-light">{item.sublabel}</div>
                  
                  {/* Subtle underline animation */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mt-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 1.2 + index * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}