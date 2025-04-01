"use client";
import Image from "next/image";
import localFont from "next/font/local";
import { TextAnimate } from "@/components/magicui/text-animate";
import { WavyText } from "@/components/magicui/wavy-text";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { CardBody,CardContainer,CardItem } from "@/components/ui/3d-card";
import { Timeline } from "@/components/ui/timeline"; // Import the Timeline component
import { TextReveal } from "@/components/magicui/text-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

import Link from 'next/link';
const familyName = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

export default function Home() {
  const timelineData = [
    {
      title: "January - Patang Utsav",
      content: "Description of Event 1.",
      images: [
        "/events/patang1.jpg",
        "/events/patang2.jpg"
      ],
      link: "/patang-utsav"
    },
    {
      title: "March - KMIT EVENING",
      content: (
        <div>
          <p>Description of Event 2.</p>
          <ul>
            <li>Point 1</li>
            <li>Point 2</li>
          </ul>
        </div>
      ),
      images: [
        "/events/kmit1.jpg",
        "/events/kmit2.jpg"
      ],
      link: "/kmit-evening"
    },
    {
      title: "October - Navraas",
      content: (
        <div>
          <p>Description of Event 2.</p>
          <ul>
            <li>Point 1</li>
            <li>Point 2</li>
          </ul>
        </div>
      ),
      images: [
        "/events/kmit1.jpg",
        "/events/kmit2.jpg"
      ],
      link: "/navras"
    }
  ];

  return (
    <div className="min-h-[500vh] w-full">
      <main className="flex flex-col relative min-h-[200vh]">
        {/* Hero Section */}
        <div className="h-screen flex items-center justify-center">
          <div className={`text-3xl md:text-5xl text-white ${familyName.className} flex flex-col items-center`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                scale: {
                  type: "spring",
                  damping: 5,
                  stiffness: 100,
                  restDelta: 0.001
                },
                rotate: {
                  type: "spring",
                  damping: 10,
                  stiffness: 200
                }
              }}
            >
              <Image
                src="/prlogo.png"
                width={150}
                height={150}
                alt="Public Relations KMIT"
                className="rounded-full mb-6 md:mb-11"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              Public Relations KMIT
            </TextAnimate>
            <div className={`text-white text-xl md:text-3xl text-center mt-8 ${familyName.className}`}>
        <TextAnimate animation="blurInUp" by="character" duration={1}>
          Where chaos meets creativity.
        </TextAnimate>
        </div>
          </div>
          
        </div>

        {/* KMIT Flagship Events Section */}
        <div className="container mx-auto py-20 px-4">
          <div className={`text-3xl md:text-4xl text-white ${familyName.className} text-center mb-12`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              KMIT Flagship Events
            </TextAnimate>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="container mx-auto py-20 px-4">
          <Timeline data={timelineData} />
        </div>

        {/* Sponsors Section */}
        <div className="container mx-auto py-20 px-4">
          <div className={`text-3xl md:text-4xl text-white ${familyName.className} text-center mb-12`}>
            
              Our Sponsors
            
          </div>
          <InfiniteSlider gap={24} reverse className="w-full h-full">
            <img
              src="https://motion-primitives.com/apple_music_logo.svg"
              alt="Apple Music logo"
              className="h-[120px] w-auto"
            />
            <img
              src="https://motion-primitives.com/chrome_logo.svg"
              alt="Chrome logo"
              className="h-[120px] w-auto"
            />
            <img
              src="https://motion-primitives.com/strava_logo.svg"
              alt="Strava logo"
              className="h-[120px] w-auto"
            />
            <img
              src="https://motion-primitives.com/nintendo_logo.svg"
              alt="Nintendo logo"
              className="h-[120px] w-auto"
            />
            <img
              src="https://motion-primitives.com/jquery_logo.svg"
              alt="Jquery logo"
              className="h-[120px] w-auto"
            />
            <img
              src="https://motion-primitives.com/prada_logo.svg"
              alt="Prada logo"
              className="h-[120px] w-auto"
            />
          </InfiniteSlider>

          <div className="mt-12 flex justify-center relative z-50">
            <Link href="/contact" passHref legacyBehavior>
              <a className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 text-lg font-medium text-white transition-transform hover:scale-105 hover:from-purple-600 hover:to-blue-600 w-full md:w-auto relative z-[9999] cursor-pointer pointer-events-auto mt-10">
                Sponsor our next event
              </a>
            </Link>
          </div>
        </div>

        

        
        {/* Add more content here */}
      </main>
    </div>
  );
}
