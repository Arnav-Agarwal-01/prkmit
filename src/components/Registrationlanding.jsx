"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import localFont from "next/font/local";

// Load custom fonts
const familyName = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
});

export default function AnimatedModalDemo({ className = "" }) {
  const images = [
    "/comp1.jpeg",
    "/navcomp2.png",
    "/comp4.jpeg",
    "/comp5.jpeg",
  ];

  return (
    <div className={`${className}`}>
      <Modal>
        <ModalTrigger
  className="relative group inline-flex items-center justify-center shrink-0
             bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600
             hover:from-orange-600 hover:via-pink-600 hover:to-purple-700
             text-white px-8 sm:px-10 py-3 sm:py-3.5
             min-w-[280px] sm:min-w-[340px]
             text-center rounded-full shadow-xl hover:shadow-2xl
             transition-all duration-300 transform hover:scale-105
             font-semibold overflow-hidden"
>
  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <span className="relative z-10 flex items-center justify-center">
    <span className={`${familyName.className} text-lg sm:text-xl font-medium text-white leading-tight`}>
      ✨🕺 Book your tickets for Navraas'25 here
    </span>
  </span>
  <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
</ModalTrigger>

        <ModalBody>
          <ModalContent>
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <h4 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent ${familyName.className}`}>
                  Book Your Navraas'25 Tickets
                </h4>
                <div className="mt-2 h-1 w-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mx-auto"></div>
              </motion.div>

              <motion.div 
                className="flex justify-center items-center space-x-2 overflow-hidden py-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {images.map((image, idx) => (
                  <motion.div
                    key={"images" + idx}
                    style={{
                      rotate: Math.random() * 20 - 10,
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    whileTap={{
                      scale: 1.1,
                      rotate: 0,
                      zIndex: 100,
                    }}
                    className="rounded-xl -mr-2 p-1 bg-gradient-to-br from-orange-100 to-purple-100 dark:from-orange-900 dark:to-purple-900 border-2 border-orange-200 dark:border-orange-700 flex-shrink-0 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Image
                      src={image}
                      alt="Navraas event preview"
                      width="500"
                      height="500"
                      className="rounded-lg h-16 w-16 md:h-32 md:w-32 object-cover flex-shrink-0"
                    />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-orange-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-inner"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className={`${comic.className} space-y-4`}>
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 text-lg">📋</span>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      To understand the pass generation process,{' '}
                      <Link 
                        href="https://www.instagram.com/p/DAlVxmRNVw_/" 
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800 underline decoration-wavy decoration-blue-400 hover:decoration-blue-600 transition-colors"
                      >
                        click here
                      </Link>
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-500 text-lg">🎪</span>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      This gateway is an initiative of PR KMIT
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-500 text-lg">📱</span>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      Follow{' '}
                      <Link 
                        href="https://www.instagram.com/pr.kmit/" 
                        target="_blank" 
                        className="text-blue-600 hover:text-blue-800 underline decoration-wavy decoration-blue-400 hover:decoration-blue-600 transition-colors"
                      >
                        @pr.kmit
                      </Link>
                      {' '}for continuous event updates
                    </p>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="text-red-500 text-lg">⚖️</span>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm">
                      By purchasing tickets, you agree to our terms and conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </ModalContent>

          <motion.div 
            className="text-center text-neutral-600 dark:text-neutral-400 text-sm font-medium mt-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-orange-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-3">
              Designed and Developed by{' '}
              <span className="bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent font-bold">
                Vardaan & Arnav
              </span>
            </div>
          </motion.div>

          <ModalFooter className="flex justify-center mt-6">
            <Link href="/Registerme">
              <motion.button 
                className="relative group bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center space-x-2">
                  <span className={`${familyName.className} text-lg`}>🎫 Book Now</span>
                </span>
                <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
              </motion.button>
            </Link>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

