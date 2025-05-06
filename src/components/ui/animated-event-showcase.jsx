'use client';
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export const AnimatedEventShowcase = ({ events }) => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative w-full min-h-screen py-20">
      {events.map((event, index) => (
        <EventCard key={index} event={event} index={index} />
      ))}
    </div>
  );
};

const EventCard = ({ event, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true // Changed to true to improve performance
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Simplified transformations for better performance
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [10, 0]); // Reduced angle
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]); // Less scaling
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Reduced movement
  
  // Remove perspective transformation which can be expensive
  // const perspective = useTransform(scrollYProgress, [0, 0.5], [800, 1200]);

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[80vh] flex items-center justify-center p-8 mb-20"
      style={{
        opacity,
        // perspective removed
      }}
    >
      <motion.div
        className="w-full max-w-6xl mx-auto"
        style={{
          scale,
          y,
          rotateX,
          // Add will-change to optimize browser rendering
          willChange: "transform"
        }}
      >
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-black/50 to-black/20 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 w-full h-full">
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 group-hover:scale-110"
              style={{ 
                backgroundImage: `url(${event.images[0]})`,
                // Add will-change for background image transformations
                willChange: "transform"
              }}
            />
            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8">
            <div className="flex-1 text-white">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {event.title}
              </motion.h2>

              <motion.div
                className="text-lg text-white/80 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {event.content}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link 
                  href={event.link}
                  className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-medium transition-all duration-300 hover:scale-105 hover:bg-opacity-90"
                >
                  Explore Event
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>

            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src={event.images[1]} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};