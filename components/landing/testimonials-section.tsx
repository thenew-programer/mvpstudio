'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "MVPForge helped me turn my fintech idea into a working product in just 6 weeks. The AI-generated proposal was spot-on and saved me countless hours of planning.",
    author: "Sarah Johnson",
    role: "Founder, PayTrack",
    avatar: "SJ"
  },
  {
    quote: "The level of detail in the project proposal was impressive. MVPForge understood exactly what our healthcare app needed and delivered a beautiful MVP on budget.",
    author: "David Chen",
    role: "CEO, MediConnect",
    avatar: "DC"
  },
  {
    quote: "As a non-technical founder, I was struggling to communicate my vision to developers. MVPForge bridged that gap perfectly and helped me launch faster than I thought possible.",
    author: "Alex Rivera",
    role: "Founder, TravelBuddy",
    avatar: "AR"
  },
  {
    quote: "What impressed me most was how accurately the AI estimated our timeline and costs. No surprises, just a smooth development process from start to finish.",
    author: "Michelle Taylor",
    role: "CTO, RetailFlow",
    avatar: "MT"
  }
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="testimonials" 
      ref={ref}
      className="py-20 md:py-32 bg-muted/30"
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
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="mb-6 text-muted-foreground">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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