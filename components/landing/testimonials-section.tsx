'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    quote: "The level of detail in the project proposal was impressive. MVPForge understood exactly what our healthcare app needed and delivered a beautiful MVP on budget.",
    author: "David Chen",
    role: "CEO, MediConnect",
    avatar: "DC",
    rating: 5,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    quote: "As a non-technical founder, I was struggling to communicate my vision to developers. MVPForge bridged that gap perfectly and helped me launch faster than I thought possible.",
    author: "Alex Rivera",
    role: "Founder, TravelBuddy",
    avatar: "AR",
    rating: 5,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    quote: "What impressed me most was how accurately the AI estimated our timeline and costs. No surprises, just a smooth development process from start to finish.",
    author: "Michelle Taylor",
    role: "CTO, RetailFlow",
    avatar: "MT",
    rating: 5,
    gradient: "from-amber-500 to-orange-500"
  }
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="testimonials" 
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
              Success Stories
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground">
              Hear from founders who transformed their ideas into successful MVPs with our platform.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <Card className="h-full relative overflow-hidden bg-gradient-to-br from-card/50 to-card border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <CardContent className="p-8 relative">
                  {/* Quote icon with gradient */}
                  <div className={`bg-gradient-to-br ${testimonial.gradient} rounded-xl w-12 h-12 flex items-center justify-center mb-6 shadow-lg`}>
                    <Quote className="h-6 w-6 text-white" />
                  </div>
                  
                  {/* Star rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <p className="mb-8 text-muted-foreground leading-relaxed text-lg">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center">
                    <div className={`bg-gradient-to-br ${testimonial.gradient} rounded-full p-0.5 mr-4`}>
                      <Avatar className="h-12 w-12 border-2 border-background">
                        <AvatarFallback className="bg-background text-foreground font-semibold">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{testimonial.author}</p>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}