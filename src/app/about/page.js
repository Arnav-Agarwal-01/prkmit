"use client";
import React from 'react'
import { HeroParallax } from '@/components/blocks/hero-parallax';
import { Meteors } from '@/components/ui/meteors';
import { BentoCell,BentoGrid,ContainerScale,ContainerScroll } from '@/components/blocks/hero-gallery-scroll-animation';
import { Button } from '@/components/ui/button';
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { TextAnimate } from '@/components/magicui/text-animate';
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

      
      <div style={{ height: '150px' }}></div>


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



      



      {/* Team Members section */}
      <div className="text-center mt-20 mb-12 text-4xl font-bold">
        The Team . The Myth . The Legend 
      </div>
      {/* InfiniteSlider with added spacing and increased size */}
      <div className="my-20 pb-32 pt-10"> {/* Increased bottom padding to 8rem (32) */}
        <InfiniteSlider durationOnHover={75} gap={32}> {/* Increased gap between items */}
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
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
          </div>


          

          {/* Sreekruthi */}
          <div className="flex flex-col items-center">
            <img
              src="/team/sree.jpg"
              alt="Sreekruthi"
              className="w-[230px] h-[300px] rounded-[6px]" 
            />
            <p className="mt-3 text-2xl font-bold">Sreekruthi</p>
            <p className="text-sm text-gray-500">Content Creator</p>
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
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
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
            <p className="mt-2 text-center italic text-sm">"Nothing lasts for ever make the most of it while it lasts."</p>
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
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
          </div>
          
          {/* Rythma */}
          <div className="flex flex-col items-center">
            <img
              src="team/rythma.jpg"
              alt="Rythma"
              className=" w-[250px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rythma</p>
            <p className="text-sm text-gray-500">Graphic Designer</p>
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
          </div>




          <div className="flex flex-col items-center">
            <img
              src="team/rishab.jpeg"
              alt="Rishab"
              className=" w-[250px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rishab</p>
            <p className="text-sm text-gray-500">Sponsorship Manager</p>
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
          </div>


          <div className="flex flex-col items-center">
            <img
              src="team/rishika.jpeg"
              alt="Rishika"
              className=" w-[200px] h-[300px] rounded-[6px]"
            />
            <p className="mt-3 text-2xl font-bold">Rishika</p>
            <p className="text-sm text-gray-500">Documentation Incharge</p>
            <p className="mt-2 text-center italic text-sm">"The office s4 e4 14:28"</p>
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
            <p className="mt-2 text-center italic text-sm">"Nothing lasts for ever make the most of it while it lasts."</p>
          </div>


          



        </InfiniteSlider>
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
