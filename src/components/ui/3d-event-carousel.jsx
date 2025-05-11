'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';

export const EventCarousel = ({ events }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      rotateY: direction > 0 ? 45 : -45,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      rotateY: direction < 0 ? 45 : -45,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + events.length) % events.length);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative h-[600px] w-full overflow-hidden bg-gradient-to-b from-transparent to-black/20 rounded-xl"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <div className="relative w-full h-full group cursor-pointer transform-gpu">
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${events[currentIndex].images[0]})` }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h2 className="text-3xl font-bold mb-4 transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                  {events[currentIndex].title}
                </h2>
                <div className="transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                  {events[currentIndex].content}
                </div>
                <Link 
                  href={events[currentIndex].link}
                  className="inline-flex mt-4 h-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 text-base font-medium text-white transition-transform hover:scale-105 hover:from-purple-600 hover:to-blue-600"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          onClick={() => paginate(-1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          className="absolute right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          onClick={() => paginate(1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};