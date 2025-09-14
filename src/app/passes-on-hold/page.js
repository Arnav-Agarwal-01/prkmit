"use client";
import React from 'react';
import { motion } from 'framer-motion';
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

// Load custom fonts
const familyName = localFont({
  src: "../../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/Montserrat-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf"
});

export default function PassesOnHold() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-6">
      {/* Background overlay */}
      <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        <div 
          className="w-full h-full"
          style={{
          }}
        />
      </div>

      <div className="container mx-auto max-w-4xl">
        {/* PR Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className=""
          >
            <Image src="/prlogo.png" alt="PR KMIT" width={100} height={100} className="rounded-md" />
          </motion.div>
          <span className={`${familyName.className} text-3xl md:text-4xl leading-none align-middle text-white`}>PR KMIT</span>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          {/* Maintenance Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white ${familyName.className} mb-4`}
          >
            Passes Reopening Soon
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6"
          >
            <div className="h-1 w-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto mb-6"></div>
            <h2 className={`text-xl sm:text-2xl text-orange-300 ${familyName.className} mb-2`}>
              Passes are on hold currently
            </h2>
          </motion.div>

          {/* Maintenance Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-4 mb-8"
          >
            <p className={`text-gray-300 text-lg sm:text-xl leading-relaxed ${comic.className} max-w-2xl mx-auto`}>
              The passes are currently on hold, but We'll be back soon!
            </p>
            <p className={`text-orange-200 text-base sm:text-lg  ${comic.className}`}>
                follow{' '}
              <a 
                href='https://www.instagram.com/pr.kmit/' 
                target="_blank" 
                rel="noopener noreferrer"
                className='text-orange-300 hover:text-orange-100 font-bold underline hover:no-underline transition-colors duration-200'
              > 
                @pr.kmit 
              </a>
              {' '}to know more 
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            
            
            <Link
              href="/"
              className={`bg-orange-500 border-2 border-orange-500 text-white-300 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 ${familyName.className}`}
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
