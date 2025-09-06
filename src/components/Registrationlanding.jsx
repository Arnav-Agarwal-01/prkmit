"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "./ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import localFont from "next/font/local";
import NameHighlight from "./ui/name-highlight";

// Load custom fonts - Better font selection
const familyName = localFont({
  src: "../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/Montserrat-VariableFont_wght.ttf",
});

const instructionFont = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf"
});

export default function AnimatedModalDemo({ className = "" }) {
  return (
    <div className={`${className}`}>
      <Modal>
        {/* Keep original homepage button colors (gradient) as requested */}
        <ModalTrigger
          className="relative group inline-flex items-center justify-center shrink-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white px-8 sm:px-10 py-3 sm:py-3.5 min-w-[280px] sm:min-w-[340px] text-center rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-semibold overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Image src="/prlogo.png" alt="PR KMIT" width={24} height={24} className="rounded" />
            <span className={`${familyName.className} text-lg sm:text-xl font-medium text-white leading-tight`}>
              Book Navraas'25 Tickets
            </span>
          </span>
        </ModalTrigger>

        <ModalBody>
          <ModalContent>
            <div className="relative z-10 text-center space-y-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        '0 0 20px rgba(237, 107, 32, 0.6)',
                        '0 0 30px rgba(237, 107, 32, 0.8)',
                        '0 0 20px rgba(237, 107, 32, 0.6)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-2 ring-2 ring-orange-400/30 shadow-lg backdrop-blur-sm border border-orange-300/20"
                  >
                    <Image src="/prlogo.png" alt="PR KMIT" width={48} height={48} className="rounded-md" />
                  </motion.div>
                  <span className={`${familyName.className} text-3xl md:text-4xl leading-none align-middle text-white`}>PR KMIT</span>
                </div>
                <h4 className={`text-2xl md:text-3xl font-bold text-white ${familyName.className} mb-2`}>
                  Navras 2025
                </h4>
                <div className="mt-2 h-1 w-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto shadow-sm"></div>
              </motion.div>

              {/* Instructions Section (moved up) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-xl rounded-xl p-6 border border-orange-300/20 shadow-lg">
                  <div className={`${instructionFont.className} space-y-5`}>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-orange-300 text-lg font-bold mt-0.5 flex-shrink-0">•</span>
                      <div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          To understand the pass generation process,{' '}
                          <a 
                            href="https://www.instagram.com/p/DAlVxmRNVw_/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-300 hover:text-orange-200 underline decoration-wavy decoration-orange-400/50 hover:decoration-orange-300/70 transition-all duration-300 font-medium"
                          >
                            click here
                          </a>
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-orange-300 text-lg font-bold mt-0.5 flex-shrink-0">•</span>
                      <div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          This gateway is an initiative of <span className="text-orange-300 font-semibold">PR KMIT</span>
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-orange-300 text-lg font-bold mt-0.5 flex-shrink-0">•</span>
                      <div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          Follow{' '}
                          <a 
                            href="https://www.instagram.com/pr.kmit/" 
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-orange-300 hover:text-orange-200 underline decoration-wavy decoration-orange-400/50 hover:decoration-orange-300/70 transition-all duration-300 font-medium"
                          >
                            @pr.kmit
                          </a>
                          {' '}for continuous event updates
                        </p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-orange-300 text-lg font-bold mt-0.5 flex-shrink-0">•</span>
                      <div>
                        <p className="text-gray-200 text-sm leading-relaxed">
                          By purchasing tickets, you agree to our <span className="text-orange-300 font-medium">terms and conditions</span>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              {/* Event Information Cards removed as requested */}
            </div>
          </ModalContent>

          <ModalFooter>
            <div className="w-full relative isolate grid grid-cols-1 sm:grid-cols-[1fr_auto] items-center gap-3 sm:gap-6 mt-3 sm:mt-5">
              {/* CTA left, full width on mobile */}
              <Link href="/Registerme" className="w-full sm:w-auto sm:justify-self-start">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="relative z-20 w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 cursor-pointer ring-1 ring-orange-400/30 focus:outline-none focus:ring-2 focus:ring-orange-300/60 focus:ring-offset-2 focus:ring-offset-black"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span className={`${familyName.className}`}>Continue to Registration</span>
                  <span>→</span>
                </motion.button>
              </Link>

              {/* Credits right, wraps nicely and aligns */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pointer-events-none text-center sm:text-right sm:justify-self-end sm:max-w-[460px]"
              >
                <p className={`text-amber-200 text-sm sm:text-base leading-snug font-medium ${instructionFont.className}`}>
                  Designed and Developed by
                  <NameHighlight className="mx-1" gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.6)">Vardaan Bhatia</NameHighlight>
                  and
                  <NameHighlight className="ml-1" gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.6)">Arnav Agarwal</NameHighlight>
                </p>
              </motion.div>
            </div>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
