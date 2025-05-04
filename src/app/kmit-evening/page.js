"use client";
import React from 'react'
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { TextReveal } from '@/components/magicui/text-reveal';
import localFont from 'next/font/local';
import Image from 'next/image';

const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
})

function page() {
  
  return (
    <div className='pl-8 md:pl-16 lg:pl-32 '> {/* Removed fixed height */}
        <div className='text-sm md:text-base relative top-60 text-left'>
            <TextHoverEffect text="Saanjh" size='100%'/>
        </div>

        <div>
          <TextReveal>
          The Biggest and Most Awaited Event.
          </TextReveal>

          <div className={`flex flex-col md:flex-row gap-8 items-center mt-20 px-4 ${familyName.className}`}>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                What's for the sponsors in KMIT Evening?
              </h1>
              <p className="text-lg text-neutral-300">
                Our most recent event not only met but greatly exceeded expectations with an impressive 40% increase in attendance compared to previous gatherings, marking a significant milestone in our event management journey. The vibrant atmosphere was further enriched by the presence of various sponsor stalls, which experienced substantial returns on investment. Notably, one such stall reported a remarkable profit margin of 35%, greatly contributing to the overall success of the event and proving extremely beneficial for our sponsors.
                <br /><br />
                To effectively reach such a broad and diverse audience, our marketing strategies were extensive and varied, incorporating both digital and traditional methods. This multifaceted approach ensured that we maximized our reach and impact, drawing attendees from a wide demographic. Our promotional efforts were nothing short of extraordinary—indeed, they were what one might call 'CRAZY'. We partnered with a range of sponsors, with our primary backers being the Title sponsor and several Co-sponsors. Each type of sponsorship involved a distinct marketing strategy tailored to leverage the unique contributions and brand strengths of each sponsor.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-square">
              <Image 
                src="/events/kmit1.jpg" 
                alt="KMIT Evening Sponsors"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
        <div className={`flex flex-col md:flex-row gap-8 items-center mt-20 px-4 ${familyName.className}`}>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              More Reasons for Sponsors to Join Us
              </h1>
              <p className="text-lg text-neutral-300">
              In our most recent event hosted during the evening, we saw an impressive turnout of over 1,800 attendees, including college students from NGIT, KMEC, and KMIT. This event, spanning two days, proved to be one of the most successful in our college’s history. It featured a diverse array of competitions such as gaming, public speaking, c oding, dance, singing, and theater. The wide variety of activities, coupled with substantial prize pools, not only drew in students from various institutions but also ensured they were thoroughly engaged throughout the duration of the event. Additionally, the event was greatly enhanced by the support of several high-profile sponsors including Monster, Royal Enfield, Homebody, and Top 1%, which played a crucial role in its overwhelming success. These sponsorships were instrumental in elevating the event’s appeal and execution, making it a landmark occasion on our college calendar.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-square">
              <Image 
                src="/events/kmit1.jpg" 
                alt="KMIT Evening Sponsors"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          <div className={`flex flex-col md:flex-row gap-8 items-center mt-20 px-4 ${familyName.className}`}>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Brains behind KMIT EVENING
              </h1>
              <p className="text-lg text-neutral-300">
              The PR team spearheads the dynamic efforts in promotions, marketing, and sponsorship management, crafting compelling content that truly captures and elevates the event's essence and excitement. Alongside, the Organizing Committee (OC) expertly handles the logistics, ensuring everything runs smoothly and effectively, which undeniably propels the event forward. The engagement of various clubs like Recurse, Mudra, Aaalap, Aakarashan, and many others, adds layers of excitement and fun, turning the event into a complete package of entertainment and thrills. This collaborative synergy between different groups creates an unforgettable atmosphere that resonates well beyond the event itself. 
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-square">
              <Image 
                src="/events/kmit1.jpg" 
                alt="KMIT Evening Sponsors"
                fill
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        
        
    </div>
  )
}

export default page