'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "MVPForge helped me turn my fintech idea into a working product in just 6 weeks. The AI-generated proposal was spot-on and saved me countless hours of planning.",
    author: "Sarah Johnson",
    role: "Founder, PayTrack",
    avatar: "SJ",
    rating: 5,
    gradient: "from-blue-500 to-cyan-600"
  },
  {
    quote: "The level of detail in the project proposal was impressive. MVPForge understood exactly what our healthcare app needed and delivered a beautiful MVP on budget.",
    author: "David Chen",
    role: "CEO, MediConnect",
    avatar: "DC",
    rating: 5,
    gradient: "from-violet-500 to-purple-600"
  },
  {
    quote: "As a non-technical founder, I was struggling to communicate my vision to developers. MVPForge bridged that gap perfectly and helped me launch faster than I thought possible.",
    author: "Alex Rivera",
    role: "Founder, TravelBuddy",
    avatar: "AR",
    rating: 5,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    quote: "What impressed me most was how accurately the AI estimated our timeline and costs. No surprises, just a smooth development process from start to finish.",
    author: "Michelle Taylor",
    role: "CTO, RetailFlow",
    avatar: "MT",
    rating: 5,
    gradient: "from-amber-500 to-orange-600"
  }
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Cosmic background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-30px", "100px"]) }}
        className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
      />

      <div className="container relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            data-aos="fade-up"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Success{' '}
              <span className="text-cosmic">
                Stories
              </span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p className="text-xl text-slate-300 leading-relaxed">
              Hear from founders who transformed their ideas into successful MVPs with our platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                rotateX: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.3 + index * 0.2,
                  ease: "easeOut"
                }
              } : {}}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="group"
              data-aos="flip-left"
              data-aos-delay={index * 150}
            >
              <Card className="h-full relative overflow-hidden card-cosmic shadow-2xl">
                {/* Cosmic gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={false}
                  whileHover={{ opacity: 0.05 }}
                />
                
                <CardContent className="p-8 relative">
                  {/* Quote icon with cosmic gradient and animation */}
                  <motion.div 
                    className={`bg-gradient-to-br ${testimonial.gradient} rounded-2xl w-14 h-14 flex items-center justify-center mb-6 shadow-2xl`}
                    whileHover={{ 
                      rotate: [0, -10, 10, 0],
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <Quote className="h-7 w-7 text-white" />
                    
                    {/* Cosmic pulse effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient}`}
                      animate={{ 
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    />
                  </motion.div>
                  
                  {/* Animated star rating */}
                  <motion.div 
                    className="flex items-center mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ 
                          delay: 0.6 + index * 0.1 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400 mr-1" />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.p 
                    className="mb-8 text-slate-300 leading-relaxed text-lg"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    "{testimonial.quote}"
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <motion.div 
                      className={`bg-gradient-to-br ${testimonial.gradient} rounded-full p-0.5 mr-4`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Avatar className="h-14 w-14 border-2 border-slate-800">
                        <AvatarFallback className="bg-slate-800 text-slate-100 font-semibold text-lg">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <p className="font-semibold text-lg text-slate-100">{testimonial.author}</p>
                      <p className="text-slate-400">{testimonial.role}</p>
                    </div>
                  </motion.div>
                </CardContent>

                {/* Floating cosmic particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${20 + i * 25}%`,
                        top: `${20 + i * 30}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.7,
                      }}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}