"use client";
import React from "react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

export const BackgroundGrid = ({ 
  children,
  color = "rgb(237, 107, 32)",
  maxOpacity = 0.3,
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.5,
  className = ""
}) => {
  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      {/* Background grid container */}
      <div className="fixed inset-0 w-full h-full">
        <FlickeringGrid
          color={color}
          maxOpacity={maxOpacity}
          squareSize={squareSize}
          gridGap={gridGap}
          flickerChance={flickerChance}
          className="w-full h-full"
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
};