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
import { FlipCard,FlipCardBack,FlipCardFront } from '@/components/ui/flip-card';
import { Logos3 } from "@/components/blocks/logos3"
import { HyperText } from '@/components/ui/hyper-text';
import localFont from 'next/font/local';
import StoryTrial from '@/components/ui/storycomponent';

const inconsolata = localFont({
  src : "../../../public/fonts/Inconsolata/Inconsolata-VariableFont_wdth,wght.ttf"
})

const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

const familyName2 = localFont({
  src: "../../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/static/Montserrat-SemiBold.ttf",
})

const comic = localFont({
  src : "../../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
})

function page() {
  
  const IMAGES = [
    "/team/team-1.jpeg",
    "/team/team-2.jpeg",
    "/team/team-3.jpeg",
    "/team/team-4.jpeg",
    "/team/team-5.jpeg",
  ];

  const prRoles = [
    "CR Manager", "Content Creator", "Video Editor",
    "Graphic Designer", "Documentation Incharge", "Sponsorship Manager", 
    "Developer"
  ];

  


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
      <BentoGrid className={`sticky left-0 top-0 z-0 h-screen w-full p-4`}>
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
          PR
        </h1>
        
        
      </ContainerScale>  
    </ContainerScroll>


      


      {/* What We Do section with improved layout */}
      <div className={`text-center mt-20 mb-12 text-4xl font-bold ${inconsolata.className}`}>
        What We Do
      </div>


      <div className={`min-h-screen w-full ${familyName.className}`}>
        <div className="relative left-0 w-full md:absolute">
          <FeaturesSectionWithHoverEffects />
        </div>
      </div>
      
      

          <br></br>
          <br></br>
          <br></br>


          <div className={`text-center mt-20 mb-12 text-4xl font-bold ${inconsolata.className}`}>
          Watch Us In Action 
          <div className={`text-center mt-4 mb-12 text-sm font-bold ${inconsolata.className}`}>Scroll to the left for more</div>
          </div>
          <StoryTrial className="w-full h-full overflow-hidden"/>

          <div>
  <TextAnimate animation="blurInUp" by="character" duration={1} className={`mt-12 pt-10 mt-10 mb-10 text-5xl ${familyName.className} text-center justify-center `}>
    Roles In PR 
  </TextAnimate>


  <div style={{
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "160px",
    
    marginTop:"100px"
  }}>
    {/* First row - 3 elements */}
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="Content Creator"
    />
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="Video Editor"
    />
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="CR Manager"
    />
    {/* Second row - 3 elements */}
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="Graphic Designer"
    />
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="Developer"
    />
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="Documentation"
    />
    
  </div>
  {/* Last centered element */}
  <div style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "100px",
    
    marginBottom:"200px",
    
  }}>
    <HyperText
      className={`text-3xl font-bold text-orange-300 ${familyName2.className} dark:text-white`}
      text="Sponsorship Manager"
    />
  </div>
</div>


      {/* Team Members section */}

      <div className={`text-center mt-20 mb-12 text-4xl font-bold ${familyName.className}`}>
        The Team . The Myth . The Legend 
      </div>
      
      <div className="w-full overflow-hidden">
        <InfiniteSlider duration={70} durationOnHover={150} gap={64} className="py-12">



          <div className="flex gap-8">



            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/rishi.jpeg"
                  alt="rishi"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-rose-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Rishi</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>PR Head | CR Manager</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"I offer sarcasm, <br></br>*inserts a sarcastic one liner*"</p>
                
              </FlipCardBack>
            </FlipCard>



            <FlipCard  className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="/team/rishik.jpeg"
                  alt="Team member"
                  className="h-full w-full "
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-emerald-500 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Rishik</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>CR Manager</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Real change begins with intention.<br></br>I lead with purpose and stand up for what matters."</p>
                
              </FlipCardBack>
            </FlipCard>




            
            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="/team/sree.jpg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-blue-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Sreekruthi</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>SIC | Content Creator</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"The office s4 e4 14:28"</p>
                
              </FlipCardBack>
            </FlipCard>



            <FlipCard  className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="/team/jishnu.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-purple-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Jishnu</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Content Creator</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"A true artist is an ugly man"</p>

              </FlipCardBack>
            </FlipCard>



            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/nithya.jpg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-amber-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Nithya</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Social Media Handler</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"I'm a social media ninja, <br></br> I'm always one step ahead of the trends."</p>
                
              </FlipCardBack>
            </FlipCard>



            <FlipCard  className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/syan.jpg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-teal-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Syanthan</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Content Creator</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Against the odds, i'd bet on myself."</p>
                
              </FlipCardBack>
            </FlipCard>



            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/vardaan.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-pink-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Vardaan</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Developer | Sponsorship Manager | Video Editor</h4>
                <p className={`text-md mb-4 ${comic.className}`}></p>
                
              </FlipCardBack>
            </FlipCard>



            <FlipCard  className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/arnav.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-indigo-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Arnav</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Developer</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Delusion Is The Key To Success"</p>
                
              </FlipCardBack>
            </FlipCard>




            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/sandeep.png"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-pink-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Sandeep</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Graphic Designer</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Nothing lasts for ever <br></br> make the most of it while it lasts."</p>
                
              </FlipCardBack>
            </FlipCard>




            <FlipCard  className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/rythma.png"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-indigo-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Rythma</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Graphic Designer</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Grey's Anatomy S2, E5 41:30"</p>
                
              </FlipCardBack>
            </FlipCard>

          
            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/askya.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-purple-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Akshaya</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Documentation Incharge</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Documenting one laugh at a time"</p>
                
              </FlipCardBack>
            </FlipCard>





            <FlipCard  className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/rishika.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-pink-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Rishika</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Documentation Incharge</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Veni Vidi Vici"</p>
                
              </FlipCardBack>
            </FlipCard>


            <FlipCard flipDirection="vertical" className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/rishab.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-rose-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Rishab</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Sponsorship Manager</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Your experience of life is entirely shaped by you."</p>
                
              </FlipCardBack>
            </FlipCard>




            <FlipCard className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/rushik.jpeg"
                  alt="Team member"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-teal-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Rushik</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Video Editor</h4>
                <p className={`text-md mb-4 ${comic.className}`}>"Render. Watch. Refine. Repeat."</p>
                
              </FlipCardBack>
            </FlipCard>

            <FlipCard className="h-96 w-80 flex-shrink-0">
              <FlipCardFront className="rounded-xl overflow-hidden">
                <img
                  src="team/abhinandan.jpeg"
                  alt="Abhinandan"
                  className="h-full w-full object-cover"
                />
              </FlipCardFront>
              <FlipCardBack className="flex flex-col items-center justify-center rounded-xl bg-teal-600 px-4 py-6 text-center text-white">
                <h2 className={`text-3xl font-bold ${familyName.className}`}>Abhinandan</h2>
                <h4 className={`mb-4 text-2xl ${familyName2.className}`}>Video Editor</h4>
                <p className={`text-md mb-4 ${comic.className}`}>“Chaos isn’t a pit. Chaos is a ladder.”</p>
                
              </FlipCardBack>
            </FlipCard>





            


          </div>
        </InfiniteSlider>

        
      </div>

      
      
      


    </div>

    
  )
}

export default page
