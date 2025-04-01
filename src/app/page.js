"use client";
import Image from "next/image";
import localFont from "next/font/local";
import { TextAnimate } from "@/components/magicui/text-animate";
import { WavyText } from "@/components/magicui/wavy-text";
import { AnimatedText } from "@/components/ui/animated-shiny-text";
const familyName = localFont({
  src: "../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="flex flex-col gap-8 items-center justify-center p-4 min-h-screen">
        <div className={`text-5xl text-white ${familyName.className} flex flex-col items-center`}>
          <Image
            src="/prlogo.png"
            width={150}
            height={150}
            alt="Public Relations KMIT"
            className="rounded-full mb-11 "  // Added margin-bottom
          />
          <TextAnimate animation="blurInUp" by="character" duration={1}>
            Public Relations KMIT
          </TextAnimate>
        </div>
        <div className={`text-white text-3xl text-center ${familyName.className}`}>
        <TextAnimate animation="blurInUp" by="character" duration={1}>
          Where chaos meets creativity.
        </TextAnimate>
        </div>
       
        {/* Add more content here */}
      </main>
    </div>
  );
}
