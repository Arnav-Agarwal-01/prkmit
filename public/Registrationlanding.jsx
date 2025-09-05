"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../Components/ui/animated-modal";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function AnimatedModalDemo({ className = "" }) {
  const images = [
    "/comp1.jpeg",
    "/navraas.png",
    "/navcomp2.png",
    "/comp4.jpeg",
    "/comp5.jpeg",
  ];
  return (
    (<div className={`${className}`}>
      <Modal>
      <ModalTrigger
  className="bg-white dark:bg-white dark:text-black text-white flex justify-center group/modal-btn w-40 py-2">
  <span
    className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
    Navraas&apos;25
  </span>
  <div
    className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-black z-20">
    Register Now
  </div>
</ModalTrigger>
<ModalBody>
  <ModalContent>
    <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
      Book your tickets to {" "}
      <span className="px-1 py-0.5 rounded-md bg-black dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
        Navraas&apos;25
      </span>{" "}
      Now!
    </h4>
    <div className="flex justify-center items-center">
      {images.map((image, idx) => (
        <motion.div
          key={"images" + idx}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
          }}
          whileTap={{
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
          }}
          className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden">
          <Image
            src={image}
            alt="bali images"
            width="500"
            height="500"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0" />
        </motion.div>
      ))}
    </div>
    <div className="py-3 max-w-sm mx-auto">
      <ul className="list-disc pl-5 space-y-4">
        <li className="text-neutral-700 dark:text-neutral-300 text-sm">
          To understand the PASS GENERATING process{' '}
          <Link href="https://www.instagram.com/p/DAlVxmRNVw_/"  target="_blank"
          className="text-blue-500 hover:underline">
            click on this link
          </Link>
          .
        </li>
        <li className="text-neutral-700 dark:text-neutral-300 text-sm">
          This gateway is initiative of PR KMIT.
        </li>
        <li className="text-neutral-700 dark:text-neutral-300 text-sm">
          Follow <Link href="https://www.instagram.com/pr.kmit/" target="_blank" className="text-blue-500 hover:underline">
          PR KMIT
          </Link>  for continuous updates of the event.
        </li>
        <li className="text-neutral-700 dark:text-neutral-300 text-sm">
          By buying the ticket, you agree to the terms and conditions.
        </li>
      </ul>
    </div>
  </ModalContent>
  <div className="text-center font-baskerville text-neutral-600 dark:text-white-300 text-lg font-semibold mb-6">
    Designed and Developed by <span className=" text-deep-orange-400 font-bold"> Vardaan Bhatia and Arnav Agarwal </span>
  </div>
  <ModalFooter className="gap-4">
   
    <a href="/Registerme">
      <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
        Book Now
      </button>
    </a>
  </ModalFooter>
</ModalBody>
      </Modal>
    </div>)
  );
}

