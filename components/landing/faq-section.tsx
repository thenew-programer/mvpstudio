'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does MVPForge turn my idea into an MVP?",
    answer: "MVPForge uses AI to analyze your startup idea and generate a comprehensive project proposal. Our system identifies the optimal tech stack, core features, and development approach based on your specific requirements. Once you approve the proposal, our development team builds your MVP according to the agreed specifications."
  },
  {
    question: "How accurate are the cost and timeline estimates?",
    answer: "Our AI has been trained on thousands of successful MVP projects, allowing it to provide highly accurate estimates. We typically achieve 90%+ accuracy on timeline predictions and cost estimates. If any adjustments are needed during development, you'll be notified immediately with transparent explanations."
  },
  {
    question: "What happens after my MVP is built?",
    answer: "After your MVP is completed, we provide post-launch support to ensure everything works smoothly. You'll have full access to your codebase and can choose to continue development with us or take it in-house. We also offer optional services like user testing, analytics integration, and scaling support."
  },
  {
    question: "Do I own the intellectual property of my MVP?",
    answer: "Yes, absolutely. You retain 100% ownership of all intellectual property related to your project, including the codebase, design assets, and any other deliverables created during the development process. We provide full documentation and transfer all rights upon project completion."
  },
  {
    question: "Can I make changes to the proposal before development begins?",
    answer: "Yes, the proposal is just the starting point. You can review and request changes to any aspect of the proposal before development begins. Our team will work with you to refine the scope, features, and approach to ensure the final plan aligns perfectly with your vision."
  },
  {
    question: "What types of startups are best suited for MVPForge?",
    answer: "MVPForge works well for a wide range of digital products, including web applications, mobile apps, SaaS platforms, marketplaces, and more. We've helped founders in fintech, healthcare, education, e-commerce, productivity, and many other sectors. If you're unsure whether your idea is a good fit, contact us for a free consultation."
  }
];

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="faq" 
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
              Frequently Asked Questions
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our platform and process.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}