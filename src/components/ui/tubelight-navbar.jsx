"use client";
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Home, Info, Calendar, Mail, Menu, X } from "lucide-react"

export function NavBar({
  items,
  className
}) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize);
  }, [])
  
  useEffect(() => {
    // Reduced delay from 3000ms to 1500ms
    const timer = setTimeout(() => setShowNav(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={showNav ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 w-full z-[999] pointer-events-none md:top-6 md:left-1/2 md:w-auto md:-translate-x-1/2",
        className
      )}>
      {/* Mobile view with PRKMIT text and hamburger */}
      {isMobile && (
        <div className="flex justify-between items-center w-full px-4 py-2 pointer-events-auto navbar-static-gradient">
          <div className="text-xl font-bold glow-effect" style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.8)", color: "white", fontFamily: "Arial, sans-serif" }}>
            PRKMIT
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}
      
      {/* Overlay to close menu when clicking outside */}
      {isMobile && menuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-[998]"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {isMobile ? (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate={menuOpen ? "open" : "closed"}
          className={cn(
            "flex flex-row justify-center items-center gap-4 border-t border-gray-700/30 py-3 px-4 bg-black/90 navbar-static-gradient pointer-events-auto",
            "w-full absolute top-[80px] left-0 overflow-hidden",
            !menuOpen && "pointer-events-none h-0 opacity-0"
          )}>
        {items.map((item) => {
          // Map string icon names to their corresponding components
          const getIcon = (iconName) => {
            switch(iconName.toLowerCase()) {
              case 'home': return Home;
              case 'info': return Info;
              case 'calendar': return Calendar;
              case 'mail': return Mail;
              default: return Home; // Default fallback
            }
          };
          
          const Icon = getIcon(item.icon)
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => {
                setActiveTab(item.name);
                if (isMobile) setMenuOpen(false);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
                "px-3 py-2"
              )}>
              <span className="inline glow-effect" style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.8)" }}>{item.name}</span>
              <span className="hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}>
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div
                      className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div
                      className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
        </motion.div>
      ) : (
        <div
          className={cn(
            "flex items-center gap-2 border border-transparent py-1 px-1 rounded-full shadow-lg bg-transparent navbar-static-gradient pointer-events-auto md:px-2"
          )}>
        {items.map((item) => {
          // Map string icon names to their corresponding components
          const getIcon = (iconName) => {
            switch(iconName.toLowerCase()) {
              case 'home': return Home;
              case 'info': return Info;
              case 'calendar': return Calendar;
              case 'mail': return Mail;
              default: return Home; // Default fallback
            }
          };
          
          const Icon = getIcon(item.icon)
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => {
                setActiveTab(item.name);
                if (isMobile) setMenuOpen(false);
              }}
              className={cn(
                "relative cursor-pointer text-sm font-semibold rounded-full transition-colors",
                "text-foreground/80 hover:text-primary",
                isActive && "bg-muted text-primary",
                "px-3 py-2"
              )}>
              <span className="inline">{item.name}</span>
              <span className="hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}>
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                    <div
                      className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                    <div
                      className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
        </div>
      )}
      
    </motion.div>
  );
}

<style jsx>{`
  .glow-effect {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #ff00ff, 0 0 20px #ff00ff, 0 0 25px #ff00ff, 0 0 30px #ff00ff, 0 0 35px #ff00ff;
  }
`}</style>
