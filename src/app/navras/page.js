"use client";
import React from 'react'
import { TextHoverEffect } from '@/components/ui/text-hover-effect';
import { TextReveal } from '@/components/magicui/text-reveal';
import { SponsorSections } from '@/components/ui/SponsorSection';

// Data for sponsor sections
const sponsorSections = [
  {
    title: "What's for the sponsors in Navraas?",
    body: "Sponsoring Navraas at KMIT offers your brand visibility among students, faculty, and alumni. Your brand will be prominently featured in promotional materials, event signage, and internal media, ensuring maximum exposure. Your sponsorship supports the cultural enrichment of our students, fostering pride in their heritage and providing a platform to showcase their talents. It's an investment in future leaders who value tradition and community.",
    imageSrc: "/picsforspons/navras-1.png",
    imageAlt: "Navraas Sponsors",
    imagePosition: "right"
  },
  {
    title: "More Reasons for Sponsors to Join Us",
    body: "KMIT's Navraas celebrates the rich cultural diversity of India, highlighting traditions from Kolkata's Durga Puja, Kerala's Vijayadashami, Gujarat's Navratri, and our own Dussehra. This festival embodies the spirit of victory over evil with grandeur and enthusiasm. Navraas is a cultural extravaganza that engages the entire campus community with elaborate decorations, traditional music, dance performances, and festivities. Students and faculty unite to create an atmosphere of joy and unity. We transform the campus into a lively hub with vibrant decorations and thematic setups that reflect India's diverse regions. Our dedicated team ensures that every aspect of Navraas is a feast for the senses.", // Replace with actual content
    imageSrc: "/picsforspons/navras-2.png", // Update with correct image path
    imageAlt: "Navraas Sponsors",
    imagePosition: "left",
    imageStyle: {height:'70%', width:'100%'}
  },
  {
    title: "Brains behind Navraas",
    body: "The PR team spearheads the dynamic efforts in promotions, marketing, and sponsorship management, crafting compelling content that truly captures and elevates the event's essence and excitement. Alongside, the Organizing Committee (OC) expertly handles the logistics, ensuring everything runs smoothly and effectively, which undeniably propels the event forward. The engagement of various clubs like Recurse, Mudra, Aaalap, Aakarashan, and many others, adds layers of excitement and fun, turning the event into a complete package of entertainment and thrills. This collaborative synergy between different groups creates an unforgettable atmosphere that resonates well beyond the event itself.", // Replace with actual content
    imageSrc: "/picsforspons/navras-3.png", // Update with correct image path
    imageAlt: "Navraas Team",
    imagePosition: "right",
    imageStyle: {height:'70%', width:'100%'}
  }
];

function page() {
  return (
    <div className='mx-auto px-4 md:px-8 lg:px-16 max-w-7xl'>
        <div className='text-sm md:text-base relative top-60'>
            <TextHoverEffect text="Navraas" size='100%'/>
        </div>

        <div>
          <TextReveal>
           Dance . Devotion . Divine 
          </TextReveal>

          <SponsorSections sections={sponsorSections} />
        </div>
    </div>
  );
}

export default page;