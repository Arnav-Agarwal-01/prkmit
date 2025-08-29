"use client";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import localFont from "next/font/local";
import { TextAnimate } from "@/components/magicui/text-animate";
import { WavyText } from "@/components/magicui/wavy-text";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
import { motion } from "framer-motion";
import { TextScramble } from "@/components/ui/text-scramble";
import { CardBody,CardContainer,CardItem } from "@/components/ui/3d-card";
import { EventCarousel } from "@/components/ui/3d-event-carousel"; // Import the new EventCarousel component
import { TextReveal } from "@/components/magicui/text-reveal";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { InView } from "@/components/ui/in-view";
import Link from 'next/link';
import { GradientButton } from "@/components/ui/gradient-button"
import { Component as CalendarWithEventSlots } from "@/components/ui/calendar-with-event-slots";
import AnimatedModalDemo from "@/components/Registrationlanding";


// Remove the direct imports
// Instead we'll use the Image component with the path directly

const familyName = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

const familyName2 = localFont({
  src: "../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/static/Montserrat-SemiBold.ttf",
})

const comic = localFont({
  src : "../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
})

const inconsolata = localFont({
  src : "../../public/fonts/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf"
})

export default function Home() {
  const timelineData = [
    {
      title: "January - Patang Utsav",
      content: (
        <div className={`text-lg ${comic.className}`}>
        "Patang Utsav is a vibrant celebration where the sky came alive with bold streaks of color and soaring energy. Kites danced in the wind as laughter echoed below — a day that turned open skies into a symbol of joy, freedom, and shared spirit. From friendly kite duels to unforgettable moments on the ground, the festival brought the campus together in full swing."
        </div>
        ),
      images: [
        "/events/patangutsavdecor.jpg",
        "/events/patangutsav1.jpg"
      ],
      link: "/patang-utsav"
    },
    {
      title: "March - KMIT EVENING",
      content: (
        <div className={`text-lg ${comic.className}`}>
          <p>KMIT Evening (Saanjh) is a night where talent meets spotlight. From soulful music to electrifying performances, the stage comes alive with the passion and creativity of our students. A celebration of expression, energy, and the vibrant spirit of KMIT.</p>
        </div>
      ),
      images: [
        "/events/saanjhdecor.jpg",
        "/events/saanjh2.jpg"
      ],
      link: "/kmit-evening"
    },
    {
      title: "October - Navraas",
      content: (
        <div className={`text-lg ${comic.className}`}>
          <p>Navraas is a spirited celebration of culture, devotion, and dance—an evening where the beats of Garba and Dandiya echoed through the campus. With vibrant colors, traditional attire, and hearts full of joy, students come together to honor Maa Durga and immerse themselves in the nine emotions of Navraas. It is a night of rhythm, reverence, and radiant energy.</p>
        </div>
      ),
      images: [
        "/events/navraaspreview.jpg",
        "/events/navraasdecor.jpg",
      ],
      link: "/navras"
    }
  ];

  return (
    <div className="w-full">
      <main className="flex flex-col relative">
        {/* Hero Section */}
        { // this is the button of our focus right now, this has been uncommented i am assuming
        <div className="absolute top-8 right-12 z-[50] ">
         <AnimatedModalDemo />
       </div> }
        <div className="h-screen flex items-center justify-center px-4 py-8">
          <div className={`text-3xl sm:text-3xl md:text-5xl text-white ${familyName.className} flex flex-col items-center`}>
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
            <TextAnimate animation="blurInUp" by="character" duration={1} startOnView={false}>
              Public Relations
            </TextAnimate>
            <TextAnimate animation="blurInUp" by="character" duration={1} startOnView={false} className={`mt-4`}>
              KMIT
            </TextAnimate>
            <div className={`text-white text-lg sm:text-2xl md:text-3xl text-center mt-4 sm:mt-6 md:mt-8 ${familyName.className}`}>
              <TextAnimate animation="blurInUp" by="character" duration={1} startOnView={false}>
                Where chaos meets creativity
              </TextAnimate>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.3, 1, 0.3, 1],
                delay: 0.7 // Adjust delay as needed to sync with other animations
              }}
              className="mt-6 sm:mt-8 md:mt-20 flex justify-center relative z-50"
            >
              <Link href="/contact" passHref legacyBehavior>
                <a className="inline-flex h-10 sm:h-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-orange-700 px-4 sm:px-6 md:px-8 text-base sm:text-lg font-medium text-white transition-transform hover:scale-105 sm:w-auto relative z-[9999] cursor-pointer pointer-events-auto">
                  ✨  Sponsor our next event  ✨
                </a>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 py-8 pt-8">
          <div className="w-full max-w bg-card rounded-lg shadow p-6">
            <CalendarWithEventSlots />
          </div>
        </div>

        {/* KMIT Flagship Events Section */}
        <div className="container mx-auto py-12 sm:py-16 md:py-20 px-4">
          <div className={`text-2xl sm:text-3xl md:text-5xl text-white ${familyName2.className} text-center mb-8 sm:mb-10 md:mb-12`}>
            <TextAnimate animation="blurInUp" by="character" duration={1} startOnView={false} >
              KMIT Flagship Events
            </TextAnimate>
          </div>
          <div className="container mx-auto py-8 sm:py-12 md:py-16 px-4">
            <Timeline data={timelineData} />
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="container mx-auto py-10 sm:py-16 md:py-20 px-4">
          <div className={`text-2xl sm:text-3xl md:text-4xl text-white ${familyName.className} text-center mb-8 sm:mb-10 md:mb-12`}>
            Our Sponsors
          </div>
          <InfiniteSlider gap={16} reverse className="w-full h-full">
            <img
              src="/sponsors/i20.png"
              alt="i20 fever"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
            <img
              src="/sponsors/homefoody.png"
              alt="homefoody"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
            <img
              src="/sponsors/pepsi.png"
              alt="pepsi"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
            <img
              src="sponsors/monster.png"
              alt="Monster"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
            <img
              src="sponsors/royalenfield.png"
              alt="Royal Enfield"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
            <img
              src="/sponsors/topone.png"
              alt="Top One Percentile"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
            <img
              src="/sponsors/vishal.png"
              alt="Prada logo"
              className="h-[80px] sm:h-[100px] md:h-[120px] w-auto"
            />
          </InfiniteSlider>

          <div className="mt-8 sm:mt-10 md:mt-12 mb-6 sm:mb-8 md:mb-10 flex justify-center relative z-50">
            <Link href="/contact" passHref legacyBehavior>
              <a className="inline-flex h-10 sm:h-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 sm:px-6 md:px-8 text-base sm:text-lg font-medium text-white transition-transform hover:scale-105 hover:from-purple-600 hover:to-blue-600 w-full sm:w-auto relative z-[9999] cursor-pointer pointer-events-auto mt-6 sm:mt-8 md:mt-10">
                Sponsor our next event
              </a>
            </Link>
          </div>
        </div>
        <div className="py-4 sm:py-6 md:py-8"></div>

        {/* Image Gallery Section */}
        <div className="w-full relative">
          <div className="flex items-start justify-center pb-8 sm:pb-10 md:pb-12">
            <InView
              viewOptions={{ once: true, margin: "0px 0px -200px 0px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.09 },
                },
              }}
            >
              <div className="columns-2 gap-1 px-4 sm:px-6 md:px-8 sm:columns-3">
                {[
                  { src: "/ImageGallery/dance.jpg", alt: "Dance image" },
                  { src: "/ImageGallery/drums.jpg", alt: "Drums image" },
                  { src: "/ImageGallery/mars.jpg", alt: "Mars image" },
                  { src: "/ImageGallery/khonsu.jpg", alt: "Khonsu image" },
                  { src: "/ImageGallery/darkAndLight.png", alt: "Dark and Light image" },
                  { src: "/ImageGallery/silhoutte.jpg", alt: "Silhoutte image" },
                  { src: "/ImageGallery/stage.jpg", alt: "Stage image" },
                  { src: "/ImageGallery/light.jpg", alt: "Light image" },
                  { src: "/ImageGallery/singerbg.png", alt: "Singer background image" },
                  { src: "/ImageGallery/singing.jpg", alt: "Singing image" },
                  { src: "/ImageGallery/voilin.png", alt: "Voilin image" },
                  { src: "/ImageGallery/navrasdecor.png", alt: "Navras Decor image" },
                  { src: "/ImageGallery/navraspublic.png", alt: "Navras Public image" },
                ].map((img, index) => {
                  return (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
                        visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
                      }}
                      key={index}
                      className="mb-2 sm:mb-3 md:mb-4"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={500}
                        height={300}
                        priority={index<11}
                        className="size-full rounded-[12px] sm:rounded-[16px] md:rounded-[20px] object-contain"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </InView>
          </div>
        </div>
      </main>
    </div>
  );
}