"use client";
import React from 'react'
import { HeroParallax } from '@/components/blocks/hero-parallax';
import { Meteors } from '@/components/ui/meteors';

function page() {
  // Team members data for the HeroParallax component
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
    // Adding 10 more team members
    {
      title: "Team Member 16",
      link: "#",
      thumbnail: "/Images/about/image1.png", // Reusing existing images as placeholders
    },
    {
      title: "Team Member 17",
      link: "#",
      thumbnail: "/Images/about/image2.png",
    },
    {
      title: "Team Member 18",
      link: "#",
      thumbnail: "/Images/about/rogue.png",
    },
    {
      title: "Team Member 19",
      link: "#",
      thumbnail: "/Images/about/editorially.png",
    },
    {
      title: "Team Member 20",
      link: "#",
      thumbnail: "/Images/about/editrix.png",
    },
    {
      title: "Team Member 21",
      link: "#",
      thumbnail: "/Images/about/pixelperfect.png",
    },
    {
      title: "Team Member 22",
      link: "#",
      thumbnail: "/Images/about/algochurn.png",
    },
    {
      title: "Team Member 23",
      link: "#",
      thumbnail: "/Images/about/aceternityui.png",
    },
    {
      title: "Team Member 24",
      link: "#",
      thumbnail: "/Images/about/tailwindmasterkit.png",
    },
    {
      title: "Team Member 25",
      link: "#",
      thumbnail: "/Images/about/smartbridge.png",
    },
  ];
  
  // New array for the meteor cards with different content
  const meteorCards = [
    {
      title: "Event Promotion",
      description: "We are dedicated to ensuring that every student participates in all events, big or small so that no one misses out on the excitement and opportunities to participate!",
      
    },
    {
      title: "Social Media Management",
      description: "We are adept at crafting compelling content, fostering community engagement, and connecting with audiences. We leverage platforms to drive interaction and relationships.",
      
    },
    {
      title: "Sponsorship Coordination",
      description: "We manage sponsorships, nurturing partnerships that align with our goals. We secure support, enhance visibility, and ensure mutual benefits for sponsors and our initiatives.",
      
    },
    {
      title: "Community Engagement",
      description: "We support student clubs, engage in cultural events, and run mentorship programs. Our newsletters keep everyone informed, building a vibrant, connected, and inclusive community.",
      
      
    },
    {
      title: "Feedback Management",
      description: "We handle feedback, bridging the gap between students and management. We gather insights, address concerns promptly, and enhance satisfaction, promoting a supportive and responsive campus environment.",
      
    },
    {
      title: "Networking",
      description: "We excel in networking and building relationships, connecting media and alumni. Our efforts cultivate strong ties, enhancing visibility, trust, and support critical for sustained organizational growth and success.",
      
    }
  ];
  
  return (
    <div className="w-full">
      {/* Remove absolute positioning from HeroParallax */}
      <div className="w-full">
        <HeroParallax products={products} />
      </div>

      {/* What We Do section with improved layout */}
      <div className='text-center mt-20 mb-12 text-4xl font-bold'>
        What We Do
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-10 max-w-7xl mx-auto pb-20">
        {meteorCards.map((card, index) => (
          <div key={index} className="relative h-[400px] group">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative h-full shadow-xl bg-gray-900 border border-gray-800 p-6 overflow-hidden rounded-2xl flex flex-col justify-between">
              <div>
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
                  {card.title}
                </h1>

                <p className="font-normal text-base text-slate-400 mb-6 relative z-50">
                  {card.description}
                </p>
              </div>

              <div>

                {/* Meteor effect with z-index to ensure it's visible */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                  <Meteors number={30} className="z-10" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page