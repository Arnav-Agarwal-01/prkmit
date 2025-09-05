"use client";
import React from "react";

export default function NameHighlight({
  children,
  className = "",
  gradient = "from-orange-300 via-orange-200 to-orange-100",
  delay = 0,
}) {
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
          opacity: 0.7;
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
          background: radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,.22), rgba(255,255,255,0) 60%);
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

