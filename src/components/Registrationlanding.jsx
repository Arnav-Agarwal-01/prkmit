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

// Load custom fonts: Headings Montserrat, Body Sora
const familyName = localFont({
  src: "../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/Montserrat-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf"
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
            {/* Match homepage background with orange accents */}
            <div className="fixed inset-0 w-full h-full">
              <div 
                className="w-full h-full"
                style={{
                  background: `
                    radial-gradient(circle at 20% 20%, rgba(237, 107, 32, 0.15) 0%, transparent 30%),
                    radial-gradient(circle at 80% 80%, rgba(237, 107, 32, 0.15) 0%, transparent 30%),
                    radial-gradient(circle at 40% 60%, rgba(237, 107, 32, 0.1) 0%, transparent 25%),
                    linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)
                  `
                }}
              />
            </div>
            
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
                    <Image src="/prlogo.png" alt="PR KMIT" width={36} height={36} className="rounded-md" />
                  </motion.div>
                  <NameHighlight className={`${familyName.className} text-lg`} gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.6)" >PR KMIT</NameHighlight>
                </div>
                <h4 className={`text-2xl md:text-3xl font-bold text-white ${familyName.className} mb-2`}>
                  Book Your Navraas'25 Tickets
                </h4>
                <div className="mt-2 h-1 w-32 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto shadow-sm"></div>
              </motion.div>

              {/* Event Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-4 border border-orange-300/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📅</span>
                    </div>
                    <h5 className={`text-white font-medium ${familyName.className}`}>Event Date</h5>
                  </div>
                  <p className={`text-gray-200 text-sm ${comic.className}`}>October 2025</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-4 border border-orange-300/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🎫</span>
                    </div>
                    <h5 className={`text-white font-medium ${familyName.className}`}>Ticket Price</h5>
                  </div>
                  <p className={`text-gray-200 text-sm ${comic.className}`}>₹199 per person</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-4 border border-orange-300/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📍</span>
                    </div>
                    <h5 className={`text-white font-medium ${familyName.className}`}>Venue</h5>
                  </div>
                  <p className={`text-gray-200 text-sm ${comic.className}`}>KMIT Campus</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-4 border border-orange-300/20"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm font-bold">🎉</span>
                    </div>
                    <h5 className={`text-white font-medium ${familyName.className}`}>Experience</h5>
                  </div>
                  <p className={`text-gray-200 text-sm ${comic.className}`}>Garba & Dandiya Night</p>
                </motion.div>
              </div>

              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8"
              >
                <h5 className={`text-white font-medium ${familyName.className} mb-4`}>Past Event Highlights</h5>
                <div className="grid grid-cols-2 gap-3">
                  {images.map((src, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                      className="relative group cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`Event highlight ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-24 object-cover rounded-lg transition-transform group-hover:scale-105 border border-orange-300/20"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </ModalContent>

          <ModalFooter>
            <div className="flex flex-col sm:flex-row gap-3 w-full relative z-10">
              <Link href="/Registerme" className="flex-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer relative z-10"
                  style={{ pointerEvents: 'auto' }}
                >
                  <span className={`${familyName.className}`}>Continue to Registration</span>
                  <span>→</span>
                </motion.button>
              </Link>
            </div>
            
            {/* Developer Credits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-4"
            >
              <p className={`text-white-300 text-xs ${comic.className}`}>
                Designed and Developed by 
                <NameHighlight className="mx-1" gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.5)">Vardaan Bhatia</NameHighlight>
                &
                <NameHighlight className="ml-1" gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.5)" delay={0.6}>Arnav Agarwal</NameHighlight>
              </p>
            </motion.div>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
