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
            <TextHoverEffect text="Navras" size='100%'/>
        </div>

        <div>
          <TextReveal>
           Dance . Devotion . Divine 
          </TextReveal>

          <div className={`flex flex-col md:flex-row gap-8 items-center mt-20 px-4 ${familyName.className}`}>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              What's for the sponsors in Navraas?
              </h1>
              <p className="text-lg text-neutral-300">
              Sponsoring Navraas at KMIT offers your brand visibility among students, faculty, and alumni. Your brand will be prominently featured in promotional materials, event signage, and internal media, ensuring maximum exposure. Your sponsorship supports the cultural enrichment of our students, fostering pride in their heritage and providing a platform to showcase their talents. It's an investment in future leaders who value tradition and community.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-square">
              <Image 
                src="/picsforspons/navras-1.png" 
                alt="KMIT Evening Sponsors"
                height={1000}
                width={1000}
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
              KMIT's Navraas celebrates the rich cultural diversity of India, highlighting traditions from Kolkata's Durga Puja, Kerala's Vijayadashami, Gujarat's Navratri, and our own Dussehra. This festival embodies the spirit of victory over evil with grandeur and enthusiasm. Navraas is a cultural extravaganza that engages the entire campus community with elaborate decorations, traditional music, dance performances, and festivities. Students and faculty unite to create an atmosphere of joy and unity. We transform the campus into a lively hub with vibrant decorations and thematic setups that reflect India's diverse regions. Our dedicated team ensures that every aspect of Navraas is a feast for the senses.
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-square">
              <Image 
                src="/picsforspons/navras-2.png" 
                alt="KMIT Evening Sponsors"
                height={1000}
                width={1000}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          <div className={`flex flex-col md:flex-row gap-8 items-center mt-20 px-4 ${familyName.className}`}>
            <div className="md:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Brains behind Navraas

</h1>
              <p className="text-lg text-neutral-300">
              The PR team spearheads the dynamic efforts in promotions, marketing, and sponsorship management, crafting compelling content that truly captures and elevates the event's essence and excitement. Alongside, the Organizing Committee (OC) expertly handles the logistics, ensuring everything runs smoothly and effectively, which undeniably propels the event forward. The engagement of various clubs like Recurse, Mudra, Aaalap, Aakarashan, and many others, adds layers of excitement and fun, turning the event into a complete package of entertainment and thrills. This collaborative synergy between different groups creates an unforgettable atmosphere that resonates well beyond the event itself. 
              </p>
            </div>
            <div className="md:w-1/2 relative aspect-square">
              <Image 
                src="/picsforspons/navras-3.png" 
                alt="KMIT Evening Sponsors"
                height={1000}
                width={1000}
                className="rounded-xl object-cover"
                style={{height : '80%' , width : '100%'}}
              />
            </div>
          </div>
        
        
    </div>
  )
}

export default page