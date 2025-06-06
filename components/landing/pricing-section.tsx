'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter MVP',
    price: '$4,999',
    description: 'Perfect for validating your concept with a simple, focused MVP.',
    features: [
      'AI-generated project proposal',
      'Up to 5 core features',
      'Basic user authentication',
      'Simple database setup',
      '4-week development timeline',
      '30 days of post-launch support'
    ],
    popular: false,
    cta: 'Get Started',
    icon: Zap,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Growth MVP',
    price: '$9,999',
    description: 'Comprehensive solution for startups ready to attract users and investors.',
    features: [
      'Everything in Starter MVP',
      'Up to 10 advanced features',
      'Custom user roles and permissions',
      'API integrations (up to 3)',
      'Admin dashboard',
      'Payment processing',
      '8-week development timeline',
      '60 days of post-launch support'
    ],
    popular: true,
    cta: 'Choose Growth',
    icon: Star,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Scale MVP',
    price: 'Custom',
    description: 'Tailored solution for complex ideas with specific technical requirements.',
    features: [
      'Everything in Growth MVP',
      'Unlimited features',
      'Advanced integrations',
      'Custom design system',
      'Scalable architecture',
      'Performance optimization',
      'Custom timeline',
      '90 days of post-launch support'
    ],
    popular: false,
    cta: 'Contact Us',
    icon: Crown,
    gradient: 'from-amber-500 to-orange-500'
  }
];

export function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  return (
    <section 
      id="pricing" 
      ref={ref}
      className="py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-50px", "150px"]) }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-3xl"
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
              Transparent{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pricing
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
            <p className="text-xl text-muted-foreground leading-relaxed">
              Choose the perfect plan for your startup's needs with no hidden costs or surprises.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0, 
                scale: plan.popular ? 1.05 : 1,
                transition: {
                  duration: 0.8,
                  delay: 0.3 + index * 0.2,
                  ease: "easeOut"
                }
              } : {}}
              whileHover={{ 
                y: -15,
                scale: plan.popular ? 1.08 : 1.03,
                transition: { duration: 0.3 }
              }}
              className="flex relative"
              data-aos="zoom-in"
              data-aos-delay={index * 150}
            >
              {plan.popular && (
                <motion.div 
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20"
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: 0.5 + index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }
                  } : {}}
                >
                  <div className={`bg-gradient-to-r ${plan.gradient} text-white text-sm font-semibold px-6 py-2 rounded-full shadow-xl flex items-center`}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Most Popular
                  </div>
                </motion.div>
              )}
              
              <Card className={`w-full relative overflow-hidden group transition-all duration-500 ${
                plan.popular 
                  ? 'border-2 border-primary shadow-2xl bg-gradient-to-br from-card/80 to-card/40' 
                  : 'border border-white/10 hover:border-primary/50 bg-gradient-to-br from-card/50 to-card/20'
              } backdrop-blur-xl`}>
                {/* Gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={false}
                  whileHover={{ opacity: 0.05 }}
                />
                
                <CardHeader className="relative pb-8">
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className={`bg-gradient-to-br ${plan.gradient} rounded-2xl w-14 h-14 flex items-center justify-center shadow-lg`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <plan.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    {plan.popular && (
                      <motion.div 
                        className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity
                        }}
                      >
                        Recommended
                      </motion.div>
                    )}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  
                  <motion.div 
                    className="mt-4 flex items-baseline"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-muted-foreground ml-2">/project</span>}
                  </motion.div>
                  
                  <CardDescription className="mt-4 text-base leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="relative pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={featureIndex} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                      >
                        <motion.div 
                          className="bg-green-100 dark:bg-green-900/30 rounded-full p-1 mr-3 mt-1"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </motion.div>
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="relative pt-0">
                  <Link href="/signup" className="w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant={plan.popular ? "default" : "outline"} 
                        className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                          plan.popular 
                            ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 border-0 text-white shadow-xl` 
                            : 'hover:bg-primary hover:text-primary-foreground border-2'
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </motion.div>
                  </Link>
                </CardFooter>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${plan.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                      style={{
                        left: `${15 + i * 20}%`,
                        top: `${20 + i * 25}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
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