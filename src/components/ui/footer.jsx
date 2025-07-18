"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/pr.kmit/', icon: '/social/instagram.svg' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/keshav-memorial-institute-of-technology-hyderabad/', icon: '/social/linkedin.svg' },
    { name: 'Facebook', url: 'https://www.facebook.com/KMiT.in/', icon: '/social/facebook.svg' },
  ];

  const navLinks = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
    { name: 'Events', url: '/events' },
    { name: 'Contact', url: '/contact' },
  ];

  return (
    <footer className="w-full py-6 sm:py-8 mt-12 sm:mt-16 border-t border-neutral-800 relative z-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 mb-2 sm:mb-0">
            <Link href="/" className="flex items-center mb-3">
              <Image 
                src="/prlogo.png" 
                width={40} 
                height={40} 
                alt="PR KMIT Logo" 
                className="rounded-full"
              />
              <span className="ml-3 text-white font-semibold">PR KMIT</span>
            </Link>
            <p className="text-neutral-400 text-sm">
              The Public Relations team of KMIT.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.url} 
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Events */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Events</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/patang-utsav" 
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Patang Utsav
                </Link>
              </li>
              <li>
                <Link 
                  href="/kmit-evening" 
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  KMIT Evening
                </Link>
              </li>
              <li>
                <Link 
                  href="/navras" 
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Navraas
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Have questions or want to sponsor an event? Reach out to us!
            </p>
            <Link 
              href="/contact" 
              className="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 text-sm font-medium text-white transition-transform hover:scale-105"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-xs sm:text-sm mb-4 md:mb-0 text-center md:text-left">
            Designed and developed with love by PR KMIT ❤️
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors"
                aria-label={link.name}
              >
                {/* If SVG icons are available */}
                {/* <Image src={link.icon} width={20} height={20} alt={link.name} /> */}
                
                {/* Fallback text if icons aren't available */}
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}