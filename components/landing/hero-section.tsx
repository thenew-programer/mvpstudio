'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Sparkles, Zap, Star, Rocket } from 'lucide-react';

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
    { icon: Sparkles, delay: 0, x: "15%", y: "25%", color: "from-violet-400 to-purple-600" },
    { icon: Zap, delay: 0.5, x: "85%", y: "20%", color: "from-blue-400 to-cyan-600" },
    { icon: Star, delay: 1, x: "10%", y: "75%", color: "from-pink-400 to-rose-600" },
    { icon: Rocket, delay: 1.5, x: "90%", y: "70%", color: "from-emerald-400 to-teal-600" },
  ];

  return (
    <section ref={targetRef} className="relative overflow-hidden min-h-screen flex items-center">
      {/* Cosmic floating elements */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute z-10"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4], 
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut"
          }}
        >
          <div className={`bg-gradient-to-br ${item.color} backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl animate-pulse-glow`}>
            <item.icon className="h-6 w-6 text-white" />
          </div>
        </motion.div>
      ))}

      {/* Interactive cosmic gradient that follows mouse */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, 
            rgba(139, 92, 246, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 30%, 
            rgba(236, 72, 153, 0.1) 60%, 
            transparent 100%
          )`,
        }}
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "spring", stiffness: 20, damping: 30 }}
      />

      <div className="container relative z-20">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-6xl mx-auto text-center"
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
                className="text-cosmic relative"
                animate={{ 
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                Reality
                {/* Cosmic glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-blue-500/30 to-pink-500/30 blur-3xl -z-10"
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
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
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Experience the future of MVP development with our AI-powered platform. 
              <span className="text-white font-medium bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"> No coding required.</span>
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
                className="px-10 py-6 text-lg font-semibold btn-cosmic rounded-2xl border-0 relative overflow-hidden group"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
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
                  className="px-10 py-6 text-lg font-semibold border-2 border-violet-500/30 bg-slate-900/20 backdrop-blur-xl hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-500 rounded-2xl relative overflow-hidden group"
                >
                  {/* Button shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
              { metric: "100+", label: "MVPs Delivered", sublabel: "Proven Excellence", gradient: "from-violet-400 to-purple-600" },
              { metric: "14", label: "Days Average", sublabel: "Lightning Fast", gradient: "from-blue-400 to-cyan-600" },
              { metric: "90%", label: "Success Rate", sublabel: "Guaranteed Quality", gradient: "from-pink-400 to-rose-600" },
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
                <div className="relative card-cosmic rounded-2xl p-6">
                  <motion.div 
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}
                    animate={{ 
                      backgroundPosition: ["0%", "100%", "0%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {item.metric}
                  </motion.div>
                  <div className="text-lg font-semibold text-slate-200 mb-1">{item.label}</div>
                  <div className="text-sm text-slate-400 font-light">{item.sublabel}</div>
                  
                  {/* Cosmic underline animation */}
                  <motion.div
                    className={`h-0.5 bg-gradient-to-r ${item.gradient} mx-auto mt-3 rounded-full`}
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

      {/* Elegant cosmic scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-6 h-10 border-2 border-violet-400/30 rounded-full flex justify-center backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-violet-400 to-blue-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}