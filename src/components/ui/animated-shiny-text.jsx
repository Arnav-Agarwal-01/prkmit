import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const AnimatedText = React.forwardRef((
  {
    text,
    gradientColors = "linear-gradient(90deg, #000, #fff, #000)",
    gradientAnimationDuration = 5,
    hoverEffect = false,
    className,
    textClassName,
    ...props
  },
  ref
) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const textVariants = {
    initial: {
      backgroundPosition: "0 0",
    },
    animate: {
      backgroundPosition: "100% 0",
      transition: {
        duration: gradientAnimationDuration,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <div
      ref={ref}
      className={cn("flex justify-center items-center py-8", className)}
      {...props}>
      <motion.h1
        className={cn(
          "text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] xl:text-[6rem] leading-normal",
          textClassName
        )}
        style={{
          background: gradientColors,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: isHovered ? "0 0 8px rgba(255, 255, 255, 0.53)" : "none",
        }}
        variants={textVariants}
        initial="initial"
        animate="animate"
        onHoverStart={() => hoverEffect && setIsHovered(true)}
        onHoverEnd={() => hoverEffect && setIsHovered(false)}>
        {text}
      </motion.h1>
    </div>
  );
});

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };