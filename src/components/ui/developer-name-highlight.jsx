"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

const DEVELOPER_DATA = {
  "Vardaan Arora Bhatia": {
    image: "/vardaanLinkedin.jpeg",
    url: "https://www.linkedin.com/in/vardaan-bhatia12/", // Replace with actual LinkedIn URL
  },
  "Arnav Agarwal": {
    image: "/team/arnav.jpeg", 
    url: "https://www.linkedin.com/in/arnavagarwal05//", // Replace with actual LinkedIn URL
  }
};

export default function DeveloperNameHighlight({
  children,
  className = "",
  gradient = "from-orange-300 via-orange-200 to-orange-100",
  glowColor = "rgba(237,107,32,0.6)",
  delay = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const spanRef = useRef(null);
  const developerData = DEVELOPER_DATA[children];

  useEffect(() => {
    // Add a slight delay for entrance animation
    const timer = setTimeout(() => setIsLoaded(true), delay * 1000 + 100);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isHovered && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 15 // Increased offset to ensure visibility
      });
    }
  }, [isHovered, children]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (developerData?.url) {
      window.open(developerData.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!developerData) {
    // Fallback to original NameHighlight behavior if developer not found
    return (
      <span className={`nh-wrap inline-block relative ${className}`} style={{ ['--nh-delay']: `${delay || 0}s` }}>
        <span className={`nh-text relative inline-block bg-gradient-to-r ${gradient}`}>{children}</span>
        <span aria-hidden className="nh-sheen" />
        <span aria-hidden className="nh-underline" />
        <span aria-hidden className="nh-glow" />
        <style jsx>{`
          .nh-wrap { isolation: isolate; }
          .nh-text {
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 700;
            background-size: 300% 100%;
            animation: nh-gradient 6s linear infinite;
            animation-delay: var(--nh-delay, 0s);
          }
          .nh-sheen {
            position: absolute;
            pointer-events: none;
            top: -15%;
            bottom: -15%;
            left: -20%;
            width: 18%;
            background: linear-gradient(80deg, rgba(255,255,255,0), rgba(255,255,255,.85), rgba(255,255,255,0));
            filter: blur(1.5px);
            opacity: 0.6;
            animation: nh-sheen 2.8s ease-in-out infinite;
            animation-delay: calc(var(--nh-delay, 0s) + .25s);
          }
          .nh-underline {
            position: absolute;
            left: -6%;
            right: -6%;
            bottom: -3px;
            height: 2px;
            border-radius: 9999px;
            background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.8), rgba(255,255,255,0));
            background-size: 200% 100%;
            animation: nh-underline 3.4s ease-in-out infinite;
            animation-delay: calc(var(--nh-delay, 0s) + .15s);
            opacity: 0.85;
          }
          .nh-glow {
            position: absolute;
            inset: -10% -14%;
            pointer-events: none;
            background: radial-gradient(50% 50% at 50% 50%, ${glowColor}, rgba(255,255,255,0) 60%);
            filter: blur(10px);
            opacity: .35;
            animation: nh-glow 5.5s ease-in-out infinite;
            animation-delay: var(--nh-delay, 0s);
            z-index: -1;
          }
          @keyframes nh-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 200% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes nh-sheen {
            0% { transform: translateX(0%); }
            100% { transform: translateX(650%); }
          }
          @keyframes nh-underline {
            0% { background-position: 0% 50%; }
            50% { background-position: 200% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes nh-glow {
            0%, 100% { opacity: .25; transform: scale(.985); }
            50% { opacity: .45; transform: scale(1.02); }
          }
          @media (prefers-reduced-motion: reduce) {
            .nh-text, .nh-sheen, .nh-underline, .nh-glow { animation: none !important; }
          }
        `}</style>
      </span>
    );
  }

  return (
    <>
      <span 
        ref={spanRef}
        className={`dev-name-wrap inline-block relative ${className} cursor-pointer transition-all duration-500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} 
        style={{ ['--nh-delay']: `${delay || 0}s` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <span className={`nh-text relative inline-block bg-gradient-to-r ${gradient} transition-all duration-500 ease-out hover:drop-shadow-lg`}>
          {children}
        </span>
        
        <span aria-hidden className="nh-sheen" />
        <span aria-hidden className="nh-underline" />
        <span aria-hidden className="nh-glow" />

        <style jsx>{`
          .dev-name-wrap { 
            isolation: isolate; 
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dev-name-wrap:hover {
            filter: drop-shadow(0 0 8px rgba(237, 107, 32, 0.4));
          }
          .nh-text {
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            font-weight: 700;
            background-size: 300% 100%;
            animation: nh-gradient 6s linear infinite;
            animation-delay: var(--nh-delay, 0s);
            transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          .nh-text:hover {
            filter: brightness(1.3) saturate(1.2);
            background-size: 200% 100%;
            animation-duration: 3s;
            /* Removed transform scale to prevent layout shift */
          }
          .nh-sheen {
            position: absolute;
            pointer-events: none;
            top: -15%;
            bottom: -15%;
            left: -20%;
            width: 18%;
            background: linear-gradient(80deg, rgba(255,255,255,0), rgba(255,255,255,.9), rgba(255,255,255,0));
            filter: blur(1px);
            opacity: 0.7;
            animation: nh-sheen 3.5s ease-in-out infinite;
            animation-delay: calc(var(--nh-delay, 0s) + .25s);
            transition: opacity 0.3s ease;
          }
          .dev-name-wrap:hover .nh-sheen {
            opacity: 1;
            animation-duration: 2s;
          }
          .nh-underline {
            position: absolute;
            left: -6%;
            right: -6%;
            bottom: -3px;
            height: 2px;
            border-radius: 9999px;
            background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.9), rgba(255,255,255,0));
            background-size: 200% 100%;
            animation: nh-underline 4s ease-in-out infinite;
            animation-delay: calc(var(--nh-delay, 0s) + .15s);
            opacity: 0.9;
            transition: all 0.3s ease;
          }
          .dev-name-wrap:hover .nh-underline {
            height: 3px;
            opacity: 1;
            animation-duration: 2.5s;
            background: linear-gradient(90deg, rgba(237,107,32,0), rgba(237,107,32,0.8), rgba(237,107,32,0));
          }
          .nh-glow {
            position: absolute;
            inset: -15% -18%;
            pointer-events: none;
            background: radial-gradient(50% 50% at 50% 50%, ${glowColor}, rgba(255,255,255,0) 70%);
            filter: blur(12px);
            opacity: .35;
            animation: nh-glow 6s ease-in-out infinite;
            animation-delay: var(--nh-delay, 0s);
            z-index: -1;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dev-name-wrap:hover .nh-glow {
            opacity: .8;
            transform: scale(1.05);
            filter: blur(15px);
            animation-duration: 3s;
          }
          @keyframes nh-gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 200% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes nh-sheen {
            0% { transform: translateX(0%) scaleY(1); }
            50% { transform: translateX(300%) scaleY(1.1); }
            100% { transform: translateX(700%) scaleY(1); }
          }
          @keyframes nh-underline {
            0% { background-position: 0% 50%; transform: scaleX(1); }
            50% { background-position: 200% 50%; transform: scaleX(1.05); }
            100% { background-position: 0% 50%; transform: scaleX(1); }
          }
          @keyframes nh-glow {
            0%, 100% { 
              opacity: .25; 
              transform: scale(.98) rotate(0deg); 
            }
            33% { 
              opacity: .4; 
              transform: scale(1.02) rotate(0.5deg); 
            }
            66% { 
              opacity: .6; 
              transform: scale(1.01) rotate(-0.5deg); 
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .nh-text, .nh-sheen, .nh-underline, .nh-glow { 
              animation: none !important; 
              transition: none !important;
            }
            .nh-text:hover { transform: none !important; }
          }
        `}</style>
      </span>

      {/* Portal the tooltip to body to avoid nesting issues */}
      {isHovered && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed z-[10000] pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2">
            <Image
              src={developerData.image}
              alt={children}
              width={120}
              height={120}
              className="rounded-xl object-cover shadow-xl border-2 border-white/20"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}