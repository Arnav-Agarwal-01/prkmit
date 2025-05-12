import React from 'react'
import localFont from 'next/font/local';
import { TextAnimate } from '@/components/magicui/text-animate';
import { AnimatedEventShowcase } from '@/components/ui/animated-event-showcase';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Testimonial } from '@/components/ui/testimonial-card';
import { ArrowUpRight } from "lucide-react"

import { 
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain } from "@/components/ui/card-curtain-reveal"

import Link from 'next/link';
const familyName = localFont({
    src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
  })

export default function page() {
  const timelineData = [
    {
      title: "January - Patang Utsav",
      content: "Patang Utsav is a vibrant celebration where the sky came alive with bold streaks of color and soaring energy. Kites danced in the wind as laughter echoed below — a day that turned open skies into a symbol of joy, freedom, and shared spirit. From friendly kite duels to unforgettable moments on the ground, the festival brought the campus together in full swing.",
      images: [
        "/events/patangutsav1.jpg",
        "/events/patangutsavdecor.jpg",
        
      ],
      link: "/patang-utsav"
    },
    {
      title: "March - KMIT EVENING",
      content: (
        <div>
          <p>KMIT Evening (Saanjh) is a night where talent meets spotlight. From soulful music to electrifying performances, the stage comes alive with the passion and creativity of our students. A celebration of expression, energy, and the vibrant spirit of KMIT.</p>
        </div>
      ),
      images: [
        "/events/saanjh2.jpg",
        "/events/saanjhdecor.jpg",
        
      ],
      link: "/kmit-evening"
    },
    {
      title: "October - Navraas",
      content: (
        <div>
          <p>Navraas is a spirited celebration of culture, devotion, and dance—an evening where the beats of Garba and Dandiya echoed through the campus. With vibrant colors, traditional attire, and hearts full of joy, students come together to honor Maa Durga and immerse themselves in the nine emotions of Navraas. It is a night of rhythm, reverence, and radiant energy.</p>
        </div>
      ),
      images: [
        "/events/navraasdecor.jpg",
        "/events/navraaspreview.jpg",
        
      ],
      link: "/navras"
    }
  ];
  return (
    <div>
        


        <div className="container mx-auto  pt-60 pb-8 px-4 ">
          <div className={`text-3xl md:text-6xl text-white ${familyName.className} text-center mb-12`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              KMIT Flagship Events
            </TextAnimate>
          </div>
        </div>

        {/* Animated Events Showcase */}
        <div className="container mx-auto px-4">
          <AnimatedEventShowcase events={timelineData} />
        </div>

        {/* Why Sponsor Us Section */}
        <div className="container mx-auto py-12 px-4 mt-40">
          <div className={`text-3xl md:text-4xl text-white ${familyName.className} text-center mb-8`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              Why Sponsor Us?
            </TextAnimate>
          </div>



          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="min-h-screen place-content-center place-items-center">
          <CardCurtainReveal className="h-[460px] w-96 border border-orange-500/20 bg-gradient-to-b from-[#0f0c0c] via-[#1a1310] to-[#1a1310] text-zinc-50 shadow-md hover:shadow-orange-500/10 transition-all">
        <CardCurtainRevealBody className="">
        <CardCurtainRevealTitle className="text-3xl font-medium tracking-tight text-zinc-100">
          Custom <br/>Packages
          </CardCurtainRevealTitle>
          <CardCurtainRevealDescription className="my-4 text-zinc-300">
            <p>
            We understand that every sponsor has unique goals and preferences. We offer flexible sponsorship packages tailored to your specific marketing objectives. Whether it's brand exposure, community engagement, partnering with us ensures maximizing your return on investment.
            </p>
          </CardCurtainRevealDescription>
          <ArrowUpRight />
          <CardCurtain className=" bg-zinc-50" />
        </CardCurtainRevealBody>
      </CardCurtainReveal>
    </div>

    <div className="min-h-screen place-content-center place-items-center">
    <CardCurtainReveal className="h-[460px] w-96 border border-orange-500/20 bg-gradient-to-b from-[#0f0c0c] via-[#1a1310] to-[#1a1310] text-zinc-50 shadow-md hover:shadow-orange-500/10 transition-all">
        <CardCurtainRevealBody className="">
          <CardCurtainRevealTitle className="text-3xl font-medium tracking-tight">
          Targered <br/>Engagement
          </CardCurtainRevealTitle>
          <CardCurtainRevealDescription className="my-4 ">
            <p>
            By sponsoring our college, your brand can connect with an active community engaged in entertainment, sports, and cultural events. This partnership boosts your brand’s visibility and aligns it with popular, contemporary interests which ensures extreme brand awareness.
            </p>
          </CardCurtainRevealDescription>
          <ArrowUpRight />
          <CardCurtain className=" bg-zinc-50" />
        </CardCurtainRevealBody>
      </CardCurtainReveal>
    </div>

    <div className="min-h-screen place-content-center place-items-center">
    <CardCurtainReveal className="h-[460px] w-96 border border-orange-500/20 bg-gradient-to-b from-[#0f0c0c] via-[#1a1310] to-[#1a1310] text-zinc-50 shadow-md hover:shadow-orange-500/10 transition-all">
        <CardCurtainRevealBody className="">
          <CardCurtainRevealTitle className="text-3xl font-medium tracking-tight">
          Unparalleled <br/>Visibility
          </CardCurtainRevealTitle>
          <CardCurtainRevealDescription className="my-4 ">
            <p>
            Our college boasts a vibrant, engaged student body eager to explore new opportunities. By sponsoring us, your brand gains direct access to a diverse demographic of motivated young individuals who actively participate in various academic, cultural, and community-driven initiatives.
            </p>
          </CardCurtainRevealDescription>
          <ArrowUpRight />
          <CardCurtain className=" bg-zinc-50" />
        </CardCurtainRevealBody>
      </CardCurtainReveal>
    </div>

            
            
          </div>
        </div>


        {/* Testimonials Section - Improved Styling */}
        <div className="container mx-auto py-16 px-4 mt-24 relative">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent opacity-30 pointer-events-none"></div>
          
          <div className={`text-4xl md:text-5xl text-white ${familyName.className} text-center mb-12`}>
            <TextAnimate animation="blurInUp" by="character" duration={1}>
              What Sponsors Say
            </TextAnimate>
          </div>
          
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
            Our sponsors have experienced exceptional results through our partnership. Here's what they have to say about working with us.
          </p>

          
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              name="Top One Percentile"
              testimonial="The public relations team at KMIT executed their duties excellently, ensuring that all aspects outlined in the memorandum of understanding, including marketing and advertising, were delivered upon. This level of commitment and fulfillment is rare to see in other events, and we eagerly anticipate future collaborations with them."

              image="/sponsors/topone.png"
              
            />
            <Testimonial
              name="Vishal Peripherals"
              testimonial="The professional execution and student participation made this sponsorship one of our most successful campaigns this year. The PR team's attention to detail and commitment to our brand visibility exceeded our expectations."

              image="/sponsors/vishal.png"
              
            />
            <Testimonial
              name="Royal Enfield"
              testimonial="As promised the turnout was excellent, we had great fun collaborating with PR KMIT, they pulled off a wonderful event! The engagement with our target audience was precisely what we were looking for in this partnership."
              image="/sponsors/royalenfield.png"
              
            />
          </div>
          
          {/* Call to action button with improved styling */}
          
        </div>


        <div className="mt-12 flex justify-center relative z-50">
            <Link href="/contact" passHref legacyBehavior>
              <a className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-4 text-lg font-medium text-white transition-transform hover:scale-105 hover:from-purple-600 hover:to-blue-600 w-auto md:w-auto relative z-[9999] cursor-pointer pointer-events-auto mt-10">
                Sponsor our next event
              </a>
            </Link>
          </div>

          <br/>
          <br/>
          <br/>
          <br/>
        
    </div>
  )
}
