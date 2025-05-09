"use client";
import React from 'react';
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { TextReveal } from '@/components/magicui/text-reveal';
import { SponsorSections } from '@/components/ui/SponsorSection';

// Data for sponsor sections
const sponsorSections = [
  {
    title: "What's for the sponsors in Patang Utsav?",
    body: "The highlight of Patang Utsav is the grand kite flying competition, where the skies above KMIT are painted with kites of all colors and designs, symbolizing freedom and festivity. Complementing this are traditional games and competitions like rangoli making, alongside cultural performances featuring traditional dances, music, and skits that showcase India's diverse heritage. Delicious festive foods add to the atmosphere, with numerous stalls offering sweets and savory treats integral to Sankranti. Sponsoring Patang Utsav provides a unique opportunity for your brand to gain visibility and engage directly with our dynamic community.",
    imageSrc: "/picsforspons/patang-1.jpg",
    imageAlt: "Patang Utsav Sponsors",
    imagePosition: "right"
  },
  {
    title: "More Reasons for Sponsors to Join Us",
    body: "KMIT presents Patang Utsav, our annual celebration of Sankranti. This cherished tradition marks the arrival of longer days and the harvest season, fostering joy and community bonding. Named after the vibrant kites that adorn our skies, Patang Utsav embodies a day filled with excitement and cultural richness, eagerly anticipated by students, faculty, and staff alike.",
    imageSrc: "/picsforspons/patang-2.jpg",
    imageAlt: "Patang Utsav Sponsors",
    imagePosition: "left",
    imageStyle: {height:'70%', width:'100%'}
  },
  {
    title: "Brains behind Patang Utsav",
    body: "The PR team spearheads the dynamic efforts in promotions, marketing, and sponsorship management, crafting compelling content that truly captures and elevates the event's essence and excitement. Alongside, the Organizing Committee (OC) expertly handles the logistics, ensuring everything runs smoothly and effectively, which undeniably propels the event forward. The engagement of various clubs like Recurse, Mudra, Aaalap, Aakarashan, and many others, adds layers of excitement and fun, turning the event into a complete package of entertainment and thrills. This collaborative synergy between different groups creates an unforgettable atmosphere that resonates well beyond the event itself.",
    imageSrc: "/picsforspons/patang-3.png",
    imageAlt: "Patang Utsav Sponsors",
    imagePosition: "right",
    imageStyle: {height:'70%', width:'100%'}
  }
];

function page() {
  return (
    <div className='mx-auto px-4 md:px-8 lg:px-16 max-w-7xl'>
        <div className='text-sm md:text-base relative top-60 text-center'>
            <TextHoverEffect text="Patang" size='100%'/>
            <TextHoverEffect text="Utsav" size='100%'/>
        </div>

        <div>
          <TextReveal>
          An Event Unlike Any Other.
          </TextReveal>

          <SponsorSections sections={sponsorSections} />
        </div>
    </div>
  );
}

export default page;