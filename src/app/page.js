"use client";
import Image from "next/image";
import localFont from "next/font/local";
import { TextAnimate } from "@/components/magicui/text-animate";
import { WavyText } from "@/components/magicui/wavy-text";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { CardBody,CardContainer,CardItem } from "@/components/ui/3d-card";
const familyName = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

export default function Home() {
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <CardContainer key={item} className="inter-var">
                <CardBody className="bg-black/40 relative group/card hover:shadow-2xl hover:shadow-orange-500/[0.1] border-white/[0.2] border rounded-xl p-6 h-full">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white"
                  >
                    Event Title
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-white text-sm mt-2"
                  >
                    Event description spanning multiple lines with detailed information about the flagship event.
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <Image
                      src="/prlogo.png"
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="event thumbnail"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
          </div>
        </div>
        
        {/* Add more content here */}
      </main>
    </div>
  );
}
