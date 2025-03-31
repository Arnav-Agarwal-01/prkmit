import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export const BackgroundSparkles = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen bg-black">
      {/* Background sparkles container */}
      <div className="fixed inset-0 w-full h-full">
        <SparklesCore
          id="sparkles"
          background="#000000"
          minSize={5.0}
          maxSize={10.0}
          particleColor={["#FF5757", "#5CE1E6", "#FFBD59", "#A6FF96", "#C499F3"]}
          particleDensity={15}
          speed={1.5}
          className="w-full h-full"
          options={{
            particles: {
              color: {
                value: ["#FF5757", "#5CE1E6", "#FFBD59", "#A6FF96", "#C499F3"],
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 150,
              },
              opacity: {
                value: 0.8,
                animation: {
                  enable: true,
                  speed: 1,
                  minimumValue: 0.1,
                },
              },
              size: {
                value: { min: 1, max: 2 },
                random: true,
              },
              twinkle: {
                particles: {
                  enable: true,
                  frequency: 0.05,
                  opacity: 1,
                  color: {
                    value: ["#FF5757", "#5CE1E6", "#FFBD59", "#A6FF96", "#C499F3"],
                  },
                },
              },
            },
          }}
        />
      </div>
      
      {/* Content container */}
      <div className="relative z-10 min-h-screen text-white">
        {children}
      </div>
    </div>
  );
};