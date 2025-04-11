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
    <div className='pl-8 md:pl-16 lg:pl-32'> {/* Removed fixed height */}
        <div className='text-sm md:text-base relative top-60'>
            <TextHoverEffect text="Patang" size='100%'/>
            <TextHoverEffect text="Utsav" size='100%'/>
        </div>

        <div>
          <TextReveal>
          An Event Unlike Any Other.
          </TextReveal>

          <div className={`flex flex-col md:flex-row gap-8 items-center mt-20 px-4 ${familyName.className}`}>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              What's for the sponsors in Patang Utsav?
              </h1>
              <p className="text-lg text-neutral-300">
              The highlight of Patang Utsav is the grand kite flying competition, where the skies above KMIT are painted with kites of all colors and designs, symbolizing freedom and festivity. Complementing this are traditional games and competitions like rangoli making, alongside cultural performances featuring traditional dances, music, and skits that showcase India's diverse heritage. Delicious festive foods add to the atmosphere, with numerous stalls offering sweets and savory treats integral to Sankranti. Sponsoring Patang Utsav provides a unique opportunity for your brand to gain visibility and engage directly with our dynamic community. 
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
              KMIT presents Patang Utsav, our annual celebration of Sankranti. This cherished tradition marks the arrival of longer days and the harvest season, fostering joy and community bonding. Named after the vibrant kites that adorn our skies, Patang Utsav embodies a day filled with excitement and cultural richness, eagerly anticipated by students, faculty, and staff alike.              </p>
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
              Brains behind Patang Utsav
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