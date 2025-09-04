"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { CogIcon, UserIcon, BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import localFont from "next/font/local";

// Load custom fonts for consistent branding
const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
});

/**
 * StepperWithContent Component - Main Registration/Login Flow
 * 
 * This component handles the 3-step user authentication process:
 * 1. Hall Ticket Number Entry & Validation
 * 2. Parent Phone Number Verification (last 4 digits)
 * 3. Confirmation & Login
 * 
 * Features:
 * - Progressive step validation
 * - API integration for user verification
 * - Responsive design for all devices
 * - Toast notifications for user feedback
 * - Smooth animations and transitions
 */
export default function StepperWithContent() {
  // State management for stepper navigation
  const [activeStep, setActiveStep] = useState(0); // Current step (0, 1, or 2)
  
  // User input states
  const [hallTicketNo, setHallTicketNo] = useState(""); // 10-character hall ticket number
  const [firstName, setFirstName] = useState(""); // User's first name from API
  const [parentPhone, setParentPhone] = useState(""); // Parent's full phone number from API
  const [sendDigits, setSendDigits] = useState(""); // Last 4 digits entered by user
  
  // Navigation and API configuration
  const router = useRouter(); 
  const isLastStep = activeStep === 2; 
  const isFirstStep = activeStep === 0;
  const api = process.env.NEXT_PUBLIC_API_ENDPOINT; // Backend API endpoint

  /**
   * Handle step progression and validation
   * Each step has its own validation logic and API calls
   */
  const handleNext = async () => {
    // STEP 1: Hall Ticket Validation
    if (activeStep === 0) {
      // Validate hall ticket number format (must be exactly 10 characters)
      if (hallTicketNo.length !== 10) {
        toast.error("Hall ticket number must be 10 characters.");
        return;
      }
      
      try {
        console.log(api);
        // API call to verify hall ticket exists in database
        const response = await fetch(api+"api/auth/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hallticketno: hallTicketNo }),
          credentials: 'include',
        });
        
        const data = await response.json();
        
        if (response.status === 200) {
          // Clean up the first name (remove 'KMIT' suffix if present)
          const sanitizedFirstName = data.firstname.replace(/KMIT/g, "");
          setFirstName(sanitizedFirstName.trim());
          setParentPhone(data.parentphone);
          setActiveStep((cur) => cur + 1); // Move to step 2
        } else {
          toast.error(data.msg || "An error occurred");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Server Error");
      }
    } 
    // STEP 2: Parent Phone Verification
    else if (activeStep === 1) {
      // Validate that exactly 4 digits are entered and they are all numeric
      if (sendDigits.length !== 4 || !/^\d{4}$/.test(sendDigits)) {
        toast.error("Incorrect or invalid");
        return;
      }
      setActiveStep((cur) => cur + 1); // Move to confirmation step
    } 
    // STEP 3: Final Login
    else if (activeStep === 2) {
      try {
        // API call to authenticate user with hall ticket and parent phone verification
        const response = await fetch(api+"api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            hallticketno: hallTicketNo,
            parentphone: sendDigits,
          }),
        });
        
        const data = await response.json();
        console.log(data);
        
        if (response.status === 200) {
          toast.success("Login successful!");
          // Store authentication token for subsequent API calls
          localStorage.setItem("token", data.token);
          // Navigate to payment page
          router.push(`/Paypage`);
        } else {
          toast.error(data.msg || "Login failed");
        }
      } catch (err) {
        console.error("Error:", err);
        toast.error("Server Error");
      }
    }
  };
  
  /**
   * Handle step backward navigation
   * Prevents going back from the first step
   */
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <>
      {/* Force scrollable container */}
      <div 
        className="fixed inset-0 w-full h-full bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-y-auto overflow-x-hidden"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          zIndex: 60
        }}
      >
  {/* Toasts are rendered globally in layout via ClientToaster */}
        
        {/* Responsive container with proper spacing for all devices */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-28 pb-24 max-w-4xl" style={{ minHeight: '100vh' }}>
        {/* Header Section - Brand title and subtitle */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4 sm:mb-6 lg:mb-8"
        >
          {/* Main brand title with gradient text effect */}
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ${familyName.className} mb-2 sm:mb-4`}>
            Navraas'25
          </h1>
          {/* Decorative underline */}
          <div className="h-0.5 sm:h-1 w-20 sm:w-32 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mx-auto"></div>
          {/* Subtitle with event description */}
          <p className={`text-gray-300 text-sm sm:text-base lg:text-lg mt-2 sm:mt-4 px-4 ${comic.className}`}>
            Your gateway to the most vibrant celebration
          </p>
        </motion.div>

        {/* Main Stepper Container - Glass morphism design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20"
        >
          {/* Stepper Progress Indicator */}
          <div className="mb-6 sm:mb-8 lg:mb-12">
            <Stepper 
              activeStep={activeStep}
              className="mb-4 sm:mb-6 lg:mb-8"
              activeLineClassName="bg-gradient-to-r from-orange-500 to-purple-600"
              completedLineClassName="bg-gradient-to-r from-orange-500 to-purple-600"
            >
              {/* Step 1: Login/Hall Ticket Entry */}
              <Step 
                className={`${activeStep >= 0 ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'bg-gray-600 text-gray-300'} transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10`}
              >
                <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <div className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 w-max text-center left-1/2 transform -translate-x-1/2">
                  <Typography variant="h6" className={`${activeStep === 0 ? 'text-orange-400' : 'text-gray-400'} ${familyName.className} text-xs sm:text-sm whitespace-nowrap`}>
                    Login
                  </Typography>
                </div>
              </Step>
              
              {/* Step 2: Phone Verification */}
              <Step 
                className={`${activeStep >= 1 ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'bg-gray-600 text-gray-300'} transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10`}
              >
                <CogIcon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <div className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 w-max text-center left-1/2 transform -translate-x-1/2">
                  <Typography variant="h6" className={`${activeStep === 1 ? 'text-orange-400' : 'text-gray-400'} ${familyName.className} text-xs sm:text-sm whitespace-nowrap`}>
                    Verify
                  </Typography>
                </div>
              </Step>
              
              {/* Step 3: Confirmation */}
              <Step 
                className={`${activeStep >= 2 ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'bg-gray-600 text-gray-300'} transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10`}
              >
                <BuildingLibraryIcon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
                <div className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 w-max text-center left-1/2 transform -translate-x-1/2">
                  <Typography variant="h6" className={`${activeStep === 2 ? 'text-orange-400' : 'text-gray-400'} ${familyName.className} text-xs sm:text-sm whitespace-nowrap`}>
                    Confirm
                  </Typography>
                </div>
              </Step>
            </Stepper>
          </div>

          {/* Dynamic Step Content Container */}
          <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12 lg:mt-16">
            {/* STEP 1: Hall Ticket Number Entry */}
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Step 1 Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-white ${familyName.className} mb-2`}>
                    Welcome to Navraas'25
                  </h3>
                  <p className={`text-gray-300 text-sm sm:text-base ${comic.className} px-2`}>
                    Enter your hall ticket number to get started
                  </p>
                </div>
                
                {/* Hall Ticket Input Field with floating label */}
                <div className="relative max-w-sm sm:max-w-md mx-auto px-2">
                  <input
                    type="text"
                    id="hallticket"
                    value={hallTicketNo}
                    onChange={(e) => setHallTicketNo(e.target.value.toUpperCase())} // Auto-uppercase for consistency
                    className="block px-3 sm:px-4 pb-2.5 sm:pb-3 pt-5 sm:pt-6 w-full text-base sm:text-lg text-white bg-black/50 backdrop-blur-lg rounded-lg sm:rounded-xl border-2 border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-transparent peer"
                    placeholder="Hall Ticket Number"
                  />
                  {/* Floating label animation */}
                  <label
                    htmlFor="hallticket"
                    className={`absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 sm:top-4 z-10 origin-[0] bg-black/50 px-2 sm:px-3 peer-focus:px-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 sm:peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 ${familyName.className} text-xs sm:text-sm`}
                  >
                    Enter Your Hall Ticket Number
                  </label>
                </div>
                
                {/* Example format helper */}
                <div className={`text-center text-gray-400 ${comic.className} text-xs sm:text-sm px-4`}>
                  <span>Example: </span>
                  <span className="text-orange-400 font-semibold">22BDXYZ63</span>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Parent Phone Verification */}
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Step 2 Header with personalized greeting */}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-white ${familyName.className} mb-2 sm:mb-4`}>
                    खम्मा घणी, <span className="text-orange-400">{firstName}</span> {/* Rajasthani greeting */}
                  </h3>
                  <p className={`text-gray-300 text-sm sm:text-base ${comic.className} px-2`}>
                    Enter the last 4 digits of your parent's phone number
                  </p>
                </div>

                {/* Parent Phone Input - Only accepts 4 digits */}
                <div className="relative max-w-sm sm:max-w-md mx-auto px-2">
                  <input
                    type="tel"
                    id="parentphone"
                    maxLength={4} // Restrict to 4 characters max
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
                      setSendDigits(value);
                    }}
                    className="block px-3 sm:px-4 pb-2.5 sm:pb-3 pt-5 sm:pt-6 w-full text-base sm:text-lg text-white bg-black/50 backdrop-blur-lg rounded-lg sm:rounded-xl border-2 border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-0 transition-all duration-300 placeholder-transparent peer"
                    placeholder="Last 4 digits"
                    inputMode="numeric" // Show numeric keypad on mobile
                    pattern="[0-9]*" // Pattern for numeric input
                  />
                  {/* Floating label for parent phone input */}
                  <label
                    htmlFor="parentphone"
                    className={`absolute text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 sm:top-4 z-10 origin-[0] bg-black/50 px-2 sm:px-3 peer-focus:px-2 peer-focus:text-orange-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-3 sm:peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4 ${familyName.className} text-xs sm:text-sm`}
                  >
                    Last 4 Digits of Parent's Phone
                  </label>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Confirmation Screen */}
            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Confirmation Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-white ${familyName.className} mb-2 sm:mb-4`}>
                    Confirmation
                  </h3>
                  {/* Display user's name prominently */}
                  <p className={`text-orange-400 text-base sm:text-xl ${comic.className} px-2`}>
                    {firstName}
                  </p>
                </div>

                {/* Summary of entered information */}
                <div className="max-w-sm sm:max-w-md mx-auto space-y-3 sm:space-y-4 px-2">
                  {/* Hall Ticket Number Display */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <label className={`block text-gray-300 text-xs sm:text-sm mb-2 ${familyName.className}`}>
                      Hall Ticket Number
                    </label>
                    <input
                      type="text"
                      value={hallTicketNo}
                      readOnly // Read-only display
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-white bg-black/50 rounded-md sm:rounded-lg border border-gray-600 focus:outline-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Parent Phone Digits Display */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <label className={`block text-gray-300 text-xs sm:text-sm mb-2 ${familyName.className}`}>
                      Last 4 Digits of Parent's Phone
                    </label>
                    <input
                      type="text"
                      value={sendDigits}
                      readOnly // Read-only display
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-white bg-black/50 rounded-md sm:rounded-lg border border-gray-600 focus:outline-none text-sm sm:text-base"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons - Previous/Next with responsive layout */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8 sm:mt-12 px-2">
            {/* Previous Button - Disabled on first step */}
            <Button 
              onClick={handlePrev} 
              disabled={isFirstStep}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base ${isFirstStep ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'} text-white transition-all duration-300 ${familyName.className} order-2 sm:order-1`}
            >
              Previous
            </Button>
            
            {/* Next/Submit Button - Changes text based on current step */}
            <motion.button
              onClick={handleNext}
              className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${familyName.className} text-sm sm:text-base order-1 sm:order-2`}
              whileHover={{ scale: 1.05 }} // Hover animation
              whileTap={{ scale: 0.95 }} // Click animation
            >
              {/* Dynamic button text based on current step */}
              {isLastStep ? "🎫 Login & Proceed" : "Next →"}
            </motion.button>
          </div>
        </motion.div>

        {/* Footer - Developer Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-6 sm:mt-8 px-4"
        >
          <p className={`text-gray-400 text-xs sm:text-sm ${comic.className}`}>
            Designed and Developed by{' '}
            <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Vardaan & Arnav
            </span>
          </p>
        </motion.div>
      </div>
      </div>
    </>
  );
}
