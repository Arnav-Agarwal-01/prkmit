"use client";
import { cn } from "../../app/util/cn";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image"; // Ensure correct import for Image

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-baskerville text-center relative overflow-hidden",
        className
      )}
      style={{ color: 'black', backgroundColor: 'white' }}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open } = useModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup on unmount to restore scrolling in case the route changes while modal is open
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const modalRef = useRef(null);
  const { setOpen } = useModal();
  useOutsideClick(modalRef, () => setOpen(false));

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
      className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-[9997] p-4"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
        "min-h-[50%] max-h-[90dvh] md:max-w-[40%] w-full sm:w-auto bg-black text-white border border-gray-700 md:rounded-2xl relative z-[9999] flex flex-col flex-1 min-h-0 overflow-hidden",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 min-h-0 p-8 md:p-10 bg-black text-white overflow-y-auto",
        className
      )}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
  "flex justify-end p-4 bg-gray-800 text-white border-t border-gray-600 flex-shrink-0",
        className
      )}
    >
      {children}
    </div>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
  className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-[9998] ${className}`}
    ></motion.div>
  );
};

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

// Updated image display with gray border
export const ModalBodyContent = () => {
  const images = [
    "/comp1.jpeg",
    "/comp2.jpeg",
    "/comp3.jpeg",
    "/comp4.jpeg",
    "/comp5.jpeg",
  ];

  return (
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-gray-800 border border-gray-600 shadow-md flex-shrink-0 overflow-hidden"
        >
          <Image
            src={image}
            alt="bali images"
            width="500"
            height="500"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
          />
        </motion.div>
      ))}
    </div>
  );
};

// Hook to detect clicks outside of a component.
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
