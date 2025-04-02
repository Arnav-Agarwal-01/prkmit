"use client";
import React from 'react'
import { HeroParallax } from '@/components/blocks/hero-parallax';
import { Meteors } from '@/components/ui/meteors';

function page() {
  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com", 
      thumbnail: "/Images/about/image1.png",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail: "/Images/about/image2.png",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail: "/Images/about/rogue.png",
    },
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail: "/Images/about/editorially.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail: "/Images/about/editrix.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail: "/Images/about/pixelperfect.png",
    },
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail: "/Images/about/algochurn.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail: "/Images/about/aceternityui.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail: "/Images/about/tailwindmasterkit.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail: "/Images/about/smartbridge.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail: "/Images/about/renderwork.png",
    },
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail: "/Images/about/cremedigital.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail: "/Images/about/goldenbellsacademy.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail: "/Images/about/invoker.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail: "/Images/about/efreeinvoice.png",
    },
  ];
  
  return (
    <div className="min-h-[500vh] w-full">
      {/* Remove absolute positioning from HeroParallax */}
      <div className="w-full">
        <HeroParallax products={products} />
      </div>

      {/* Move the 6 cards with Meteors components here */}
      <div className="flex flex-wrap justify-center items-center space-x-4 space-y-4 mt-10">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="w-full relative max-w-xs">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-2 w-2 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>

              <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                Meteors because they're cool
              </h1>

              <p className="font-normal text-base text-slate-500 mb-4 relative z-50">
                I don't know what to write so I'll just paste something cool here. One more sentence because lorem ipsum is just unacceptable. Won't ChatGPT the shit out of this.
              </p>

              <button className="border px-4 py-1 rounded-lg border-gray-500 text-gray-300">
                Explore
              </button>

              {/* Meaty part - Meteor effect */}
              <Meteors number={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page