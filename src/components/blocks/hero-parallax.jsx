"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products
}) => {
  // Divide products into 5 rows of 5 cards each
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const fourthRow = products.slice(15, 20);
  const fifthRow = products.slice(20, 25);
  
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 500]), springConfig);
  
  return (
    <div
      ref={ref}
      className="h-[500vh] py-20 md:py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="px-4 md:px-0">
        <motion.div className="flex overflow-x-auto md:overflow-visible md:flex-row-reverse space-x-reverse space-x-4 md:space-x-20 mb-10 md:mb-20 pb-4 md:pb-0">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex overflow-x-auto md:overflow-visible md:flex-row space-x-4 md:space-x-20 mb-10 md:mb-20 pb-4 md:pb-0">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex overflow-x-auto md:overflow-visible md:flex-row-reverse space-x-reverse space-x-4 md:space-x-20 mb-10 md:mb-20 pb-4 md:pb-0">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex overflow-x-auto md:overflow-visible md:flex-row space-x-4 md:space-x-20 mb-10 md:mb-20 pb-4 md:pb-0">
          {fourthRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex overflow-x-auto md:overflow-visible md:flex-row-reverse space-x-reverse space-x-4 md:space-x-20 pb-4 md:pb-0">
          {fifthRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto py-10 md:py-40 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        The Ultimate <br /> Team
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Meet the amazing people behind the Greatest Commitee Of All Time
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-40 sm:h-60 md:h-96 w-40 sm:w-60 md:w-[30rem] relative flex-shrink-0">
      <Link href={product.link} className="block group-hover/product:shadow-2xl">
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title} />
      </Link>
      <div
        className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2
        className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
