"use client";
import * as React from 'react';

import { HeroParallax } from '@/components/blocks/hero-parallax';
import { Meteors } from '@/components/ui/meteors';
import { BentoCell,BentoGrid,ContainerScale,ContainerScroll } from '@/components/blocks/hero-gallery-scroll-animation';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TextAnimate } from '@/components/magicui/text-animate';
import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";

function page() {
  
  const IMAGES = [
    "/team/team-1.jpeg",
    "/team/team-2.jpeg",
    "/team/team-3.jpeg",
    "/team/team-4.jpeg",
    "/team/team-5.jpeg",
  ]


  // Team members data for the HeroParallax component
  /*
  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com", 
      thumbnail: "/Images/about/image1.png",
    },
        
  ];
  */
  
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
      {/* Remove absolute positioning from HeroParallax 
      <div className="w-full">
        <HeroParallax products={products} />
      </div>
      */}

      {/* bento thing */}

      
      


      <ContainerScroll className="h-[350vh]">
      <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
        {IMAGES.map((imageUrl, index) => (
          <BentoCell
            key={index}
            className="overflow-hidden rounded-xl shadow-xl"
          >
            <img
              className="size-full object-cover object-center"
              src={imageUrl}
              alt=""
            />
          </BentoCell>
        ))}
      </BentoGrid>
        
      <ContainerScale className="relative z-10 text-center">
        <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800 text-white">
          PyaaR ❤️
        </h1>
        
        
      </ContainerScale>  
    </ContainerScroll>


      


      {/* What We Do section with improved layout */}
      <div className='text-center mt-20 mb-12 text-4xl font-bold'>
        What We Do
      </div>


      <div className="min-h-screen w-full">
        <div className="relative left-0 w-full md:absolute">
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
      
      <div className={`text-4xl text-center justify-center`}>
          Roles In PR
          <br></br> 
          <div className="h-[200px] flex items-center justify-center">
      <GooeyText
        texts={["CR Manager", "Video Editor", "Content Creator", "Developer","Documentation Incharge","Sponsorship Manager","Graphic Designer","Social Media Handler"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
      />

  </div>
    

    
      </div>

          <br></br>
          <br></br>
          <br></br>
      {/* Team Members section */}
      <div className="text-center mt-20 mb-12 text-4xl font-bold">
        The Team . The Myth . The Legend 
      </div>
      {/* InfiniteSlider with added spacing and increased size */}
      <div className="my-20 pb-32 pt-10"> {/* Increased bottom padding to 8rem (32) */}
        <InfiniteSlider duration={70} durationOnHover={150} gap={32}> {/* Increased gap between items */}
          {/* Increased width and border radius for images */}

          {/* Rishi */}
          <div className="flex flex-col items-center">
            <img
              src="/team/rishi.jpeg"
              alt="Rishi"
              className="w-[250px] h-[300px] rounded-[6px]" 
            />
            <p className="mt-3 text-2xl font-bold">Rishi</p>
            <p className="text-sm text-gray-500">PR Head | CR Manager</p>
            <p className="mt-2 text-center italic text-sm">"I offer sarcasm, <br></br>*inserts a sarcastic one liner*"</p>
          </div>


          

          {/* Sreekruthi */}
          <div className="flex flex-col items-center">
            <img
              src="/team/sree.jpg"
              alt="Sreekruthi"
              className="w-[230px] h-[300px] rounded-[6px]" 
            />
            <p className="mt-3 text-2xl font-bold">Sreekruthi</p>
            <p className="text-sm text-gray-500">SIC | Content Creator</p>
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
          </div>
          


          {/* Jishnu */}
          <div className="flex flex-col items-center">
            <img
              src="/team/jishnu.jpeg"
              alt="Jishnu"
              className="w-[300px] h-[300px] rounded-[6px]" 
            />
            <p className="mt-3 text-2xl font-bold">Jishnu</p>
            <p className="text-sm text-gray-500">Content Creator</p>
            <p className="mt-2 text-center italic text-sm">"A true artist is an ugly man"</p>
          </div>
          

          
          

          {/* Vardaan */}
          <div className="flex flex-col items-center">
            <img
              src="team/vardaan.jpeg"
              alt="Vardaan"
              className="w-[280px] h-[300px] rounded-[6px]" 
            />
            <p className="mt-3 text-2xl font-bold">Vardaan</p>
            <p className="text-sm text-gray-500">Developer | Sponsorship Manager | Video Editor</p>
            <p className="mt-2 text-center italic text-sm"></p>
          </div>

          {/*Sandeep*/}
          <div className="flex flex-col items-center">
            <img
              src="team/sandeep.png"
              alt="Sandeep"
              className=" w-[280px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Sandeep</p>
            <p className="text-sm text-gray-500">Graphic Designer</p>
            <p className="mt-2 text-center italic text-sm">"Nothing lasts for ever <br></br> make the most of it while it lasts."</p>
          </div>
          

          {/*Nithya*/}
          <div className="flex flex-col items-center">
            <img
              src="team/nithya.jpg"
              alt="Nithya"
              className=" w-[250px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Nithya</p>
            <p className="text-sm text-gray-500">Social Media Handler</p>
            <p className="mt-2 text-center italic text-sm">"I'm a social media ninja, <br></br> I'm always one step ahead of the trends."</p>
          </div>

          {/*askyaa*/}
          <div className="flex flex-col items-center">
            <img
              src="team/askya.jpeg"
              alt="Akshaya"
              className=" w-[250px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Akshaya</p>
            <p className="text-sm text-gray-500">Documentation Incharge</p>
            <p className="mt-2 text-center italic text-sm">"Documenting one laugh at a time"</p>
          </div>

          {/* Rushik */}
          <div className="flex flex-col items-center">
            <img
              src="/team/rushik.jpeg"
              alt="Rushik"
              className="w-[300px] h-[300px] rounded-[6px]" 
            />
            <p className="mt-3 text-2xl font-bold">Rushik</p>
            <p className="text-sm text-gray-500">Video Editor</p>
            <p className="mt-2 text-center italic text-sm">"Render. Watch. Refine. Repeat."</p>
          </div>
          
          {/* Rythma */}
          <div className="flex flex-col items-center">
            <img
              src="team/rythma.png"
              alt="Rythma"
              className=" w-[350px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rythma</p>
            <p className="text-sm text-gray-500">Graphic Designer</p>
            <p className="mt-2 text-center italic text-sm">"Grey's Anatomy S2, E5 41:30"</p>
          </div>




          <div className="flex flex-col items-center">
            <img
              src="team/rishab.jpeg"
              alt="Rishab"
              className=" w-[250px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rishab</p>
            <p className="text-sm text-gray-500">Sponsorship Manager</p>
            <p className="mt-2 text-center italic text-sm">"Your experience of life is entirely shaped by you."</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="team/rishika.jpeg"
              alt="Rishika"
              className=" w-[200px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rishika</p>
            <p className="text-sm text-gray-500">Documentation Incharge</p>
            <p className="mt-2 text-center italic text-sm">"Veni Vidi Vici"</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="team/arnav.jpeg"
              alt="Arnav"
              className=" w-[220px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Arnav</p>
            <p className="text-sm text-gray-500">Developer</p>
            <p className="mt-2 text-center italic text-sm">"Bhagwaan Bharose"</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="team/syan.jpg"
              alt="Syanthan"
              className=" w-[200px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Syanthan</p>
            <p className="text-sm text-gray-500">Content Creator</p>
            <p className="mt-2 text-center italic text-sm">"Against the odds, i'd bet on myself."</p>
          </div>


          

          <div className="flex flex-col items-center">
            <img
              src="team/rishik.jpeg"
              alt="Rishik"
              className=" w-[280px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rishik</p>
            <p className="text-sm text-gray-500">CR Manager</p>
            <p className="mt-2 text-center italic text-sm">"Real change begins with intention.<br></br>I lead with purpose and stand up for what matters."</p>
          </div>


          



        </InfiniteSlider>
      </div>
      
    </div>
  )
}

export default page
