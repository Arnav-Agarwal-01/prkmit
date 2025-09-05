"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import localFont from "next/font/local";
import Image from "next/image";
import NameHighlight from "@/components/ui/name-highlight";

// Load custom fonts: Headings Montserrat, Body Sora
const familyName = localFont({
  src: "../../../public/fonts/Bangers,Montserrat,Sora,Ysabeau_SC/Montserrat/Montserrat-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf"
});

/**
 * HeroHighlightDemo Component - Payment Processing Flow
 * 
 * This component handles the payment and entry pass generation process:
 * 1. Display payment QR code for UPI transactions
 * 2. Transaction ID submission and validation
 * 3. Entry pass QR code generation
 * 4. Download functionality for the entry pass
 * 
 * Features:
 * - Dual state UI (payment form vs. success screen)
 * - Real-time transaction validation
 * - QR code generation and download
 * - Background music on success
 * - Responsive design for all devices
 * - Comprehensive error handling
 */
export default function HeroHighlightDemo() {
  const router = useRouter();
  
  // Payment and transaction state management
  const [transactionId, setTransactionId] = useState(""); // 12-digit transaction ID from user
  const [qrCode, setQrCode] = useState(""); // Generated entry pass QR code (base64 image)
  const [error, setError] = useState(""); // Error message display
  const [playMusic, setPlayMusic] = useState(false); // Background music trigger
  const [isLoading, setIsLoading] = useState(false); // Loading state for API calls
  
  // Configuration and utilities
  const api = process.env.NEXT_PUBLIC_API_ENDPOINT; // Backend API endpoint
  const { width, height } = useWindowSize(); // Screen size for responsive behavior

  /**
   * Handle transaction submission and validation
   * Processes the 12-digit transaction ID and generates entry pass
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    // Retrieve authentication token from localStorage (set during login)
    const token = localStorage.getItem("token");

    // Validate authentication token exists
    if (!token) {
      setError("No token found. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      // API call to submit transaction ID and generate entry pass
      const response = await fetch(api+"api/transaction/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // JWT token for user authentication
        },
        body: JSON.stringify({ transactionid: transactionId }),
      });

      // Handle API response errors
      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Error submitting transaction");
        setIsLoading(false);
        return;
      }

      // Success: Extract QR code and trigger success state
      const data = await response.json();
      setQrCode(data.qrCode); // Base64 encoded QR code image
      setError(""); // Clear any previous errors
      setPlayMusic(true); // Trigger celebration music
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setError("Failed to submit transaction. Please try again.");
      setIsLoading(false);
    }
  };

  /**
   * Handle entry pass download
   * Creates a downloadable link for the QR code image
   */
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode; // Base64 image data
    link.download = 'navraas25-entry-pass.png'; // Suggested filename
    link.click(); // Trigger download
  };

  /**
   * Background music effect on successful payment
   * Plays celebration music when entry pass is generated
   */
  useEffect(() => {
    let bgmAudio;
    if (playMusic) {
      bgmAudio = new Audio("/subhbgm.mp3");
      bgmAudio.play().catch(err => console.log("Audio play failed:", err));
      
      // Cleanup function to stop music when component unmounts
      return () => {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      };
    }
  }, [playMusic]);

  return (
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-28 pb-24 max-w-2xl" style={{ minHeight: '100vh' }}>
        {/* PR Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <Image
            src="/prlogo.png"
            alt="PR KMIT"
            width={44}
            height={44}
            className="rounded-md shadow-sm ring-1 ring-white/10"
            priority
          />
          <NameHighlight className={`${familyName.className} text-lg`} gradient="from-orange-300 via-pink-300 to-purple-300" glowColor="rgba(249,115,22,0.5)">PR KMIT</NameHighlight>
        </motion.div>
        
        {/* CONDITIONAL RENDERING: Payment Form vs Success Screen */}
        {!qrCode ? (
          // PAYMENT STATE: Before transaction submission - Show payment interface
          <div className="w-full space-y-6">
            {/* Main Payment Card: Orange glass morphism container */}
            <motion.div 
              className="w-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-orange-300/20 ring-1 ring-orange-400/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
            {/* Header Section: Title and instructions */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-4 sm:mb-6 lg:mb-8"
            >
              {/* Main title with gradient text effect */}
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-white ${familyName.className} mb-2 sm:mb-4`}>
                Complete Payment
              </h1>
              <div className="h-px sm:h-0.5 w-16 sm:w-24 bg-white/15 rounded-full mx-auto mb-2 sm:mb-4"></div>
              {/* Subtitle instruction */}
              <p className={`text-gray-300 ${comic.className} text-sm sm:text-base px-2`}>
                Scan the QR to pay for your Navraas’25 ticket
              </p>
            </motion.div>

            {/* QR Code Section: Payment interface with QR display */}
            <motion.div 
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* QR Header: Icon and title */}
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="bg-indigo-600 rounded-full p-2 sm:p-3">
                  <span className="text-white text-lg sm:text-2xl">💳</span>
                </div>
                <h3 className={`text-black text-base sm:text-lg font-bold ml-2 sm:ml-3 ${familyName.className}`}>
                  Scan to Pay
                </h3>
              </div>
              
              {/* QR Code Image Container: Responsive image display */}
              <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                <motion.img
                  src="/newqrkmit.png" // Static UPI payment QR code
                  alt="Payment QR Code" 
                  className="object-contain h-full w-full max-w-full max-h-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </div>
              
              {/* QR Code Usage Instructions */}
              <div className="text-center">
                <p className={`text-gray-700 text-xs sm:text-sm ${comic.className}`}>
                  Use any UPI app to scan and pay
                </p>
              </div>
            </motion.div>

            {/* Transaction Form: Post-payment verification form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 sm:space-y-6 bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10"
            >
              {/* Transaction ID Input Field */}
              <div>
                <label className={`block text-white text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${familyName.className}`}>
                  Enter Transaction ID
                </label>
                <div className="relative">
                  {/* Numeric input with validation for transaction ID */}
                  <input
                    id="transactionId"
                    type="text"
                    value={transactionId}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numeric input, max 12 digits for transaction ID
                      if (/^\d*$/.test(value) && value.length <= 12) {
                        setTransactionId(value);
                      }
                    }}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg text-white bg-neutral-900/80 backdrop-blur rounded-lg sm:rounded-xl border-2 border-neutral-700 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter 12-digit Transaction ID"
                    maxLength={12} 
                  />
                  {/* Input icon indicator */}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                    <span className="text-gray-400">💳</span>
                  </div>
                </div>
              </div>

              {/* Submit Button: Validates transaction and generates entry pass */}
              <motion.button
                type="submit"
                disabled={isLoading || transactionId.length !== 12}
        className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform ${
                  isLoading || transactionId.length !== 12
                    ? 'bg-neutral-700 cursor-not-allowed' // Disabled state
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg hover:scale-105' // Active state
                } text-white ${familyName.className}`}
                whileHover={!isLoading && transactionId.length === 12 ? { scale: 1.02 } : {}}
                whileTap={!isLoading && transactionId.length === 12 ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  // Loading state with spinner
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  // Default button text with emoji
                  "🎫 Submit & Get Entry Pass"
                )}
              </motion.button>
            </motion.form>

            {/* Error Display: Shows validation or API errors */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl"
              >
                <p className={`text-red-300 text-center text-sm sm:text-base ${comic.className}`}>
                  {error}
                </p>
              </motion.div>
            )}
            
            {/* Instructions Card: Important guidelines for users */}
            <motion.div 
              className="p-4 sm:p-6 bg-white/5 rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Instructions header */}
              <div className="flex items-center mb-3">
                <span className="text-indigo-300 text-lg sm:text-xl mr-2 sm:mr-3">📋</span>
                <h4 className={`text-indigo-300 font-semibold ${familyName.className} text-sm sm:text-base`}>
                  Important Instructions
                </h4>
              </div>
              {/* Bulleted list of important guidelines */}
              <ul className={`space-y-2 text-gray-300 text-xs sm:text-sm ${comic.className}`}>
                <li className="flex items-start">
                  <span className="text-indigo-300 mr-2">•</span>
                  Enter the Transaction ID after completing payment
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-300 mr-2">•</span>
                  Entry requires both ticket and valid ID card
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-300 mr-2">•</span>
                  Keep your entry pass safe for the event
                </li>
              </ul>
            </motion.div>

            {/* Footer: Developer credits */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-6"
            >
              <p className={`text-gray-500 text-xs sm:text-sm ${comic.className}`}>
                Designed and Developed by 
                <NameHighlight className="mx-1" gradient="from-indigo-300 via-violet-300 to-cyan-300">Vardaan Bhatia</NameHighlight>
                &
                <NameHighlight className="ml-1" gradient="from-indigo-300 via-violet-300 to-cyan-300" delay={0.6}>Arnav Agarwal</NameHighlight>
              </p>
            </motion.div>
          </motion.div>
          </div>
        ) : (
          /* SUCCESS STATE: Entry Pass Generated - Shows after successful payment */
          <div className="w-full space-y-6">
            {/* Entry Pass Card: Main success container with celebration theme */}
            <motion.div 
              className="w-full bg-neutral-900/60 backdrop-blur rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-neutral-800 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
            {/* Celebration Background: Colorful overlay for success state */}
            <div className="absolute inset-0 bg-indigo-500/10"></div>
            
            {/* Success Header: Confirmation message with checkmark */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-4 sm:mb-6 lg:mb-8 relative z-10"
            >
              {/* Success checkmark icon */}
              <div className="bg-green-600 rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-2xl sm:text-3xl">✅</span>
              </div>
              {/* Success title with green gradient */}
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-white ${familyName.className} mb-2`}>
                Payment Successful!
              </h1>
              {/* Success subtitle */}
              <p className={`text-gray-300 ${comic.className} text-sm sm:text-base px-2`}>
                Your Navraas'25 entry pass is ready
              </p>
            </motion.div>

            {/* Entry Pass QR Code: Generated unique QR for event entry */}
            <motion.div 
              className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 shadow-lg relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Entry pass header */}
              <div className="text-center mb-3 sm:mb-4">
                <h3 className={`text-black text-base sm:text-lg lg:text-xl font-bold ${familyName.className}`}>
                  🎭 Your Entry Pass 🎭
                </h3>
                <p className={`text-gray-600 text-xs sm:text-sm ${comic.className}`}>
                  Present this QR code at the event entrance
                </p>
              </div>
              
              {/* Generated QR Code Display: User-specific entry pass */}
              <div className="w-full h-56 sm:h-64 lg:h-80 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                <motion.img
                  src={qrCode} // Dynamically generated QR code from API
                  alt="Your Navraas'25 Entry Pass"
                  className="object-contain h-full w-full max-h-full max-w-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </div>
            </motion.div>

            {/* Download Button: Save entry pass to device */}
            <motion.button
              onClick={handleDownload}
              className={`w-full py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg mb-4 sm:mb-6 ${familyName.className} relative z-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Download button content with icon and text */}
              <div className="flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Download Entry Pass</span>
              </div>
            </motion.button>

            {/* Success Instructions: Final guidelines for event attendance */}
            <motion.div 
              className="p-3 sm:p-4 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {/* Success instructions header */}
              <div className="flex items-center mb-2 sm:mb-3">
                <span className="text-indigo-300 text-lg sm:text-xl mr-2 sm:mr-3">🎉</span>
                <h4 className={`text-white font-semibold ${familyName.className} text-sm sm:text-base`}>
                  You're All Set!
                </h4>
              </div>
              {/* Final instructions for successful registration */}
              <ul className={`space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm ${comic.className}`}>
                <li className="flex items-start">
                  <span className="text-indigo-300 mr-1 sm:mr-2">•</span>
                  Download and save this QR code securely
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-300 mr-1 sm:mr-2">•</span>
                  Do you have a Dandiya partner? Better find one! 💃🕺
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-300 mr-1 sm:mr-2">•</span>
                  See you at Navraas'25 for an unforgettable night!
                </li>
              </ul>
            </motion.div>
          </motion.div>
          </div>
        )}
        </div>
  );
}
