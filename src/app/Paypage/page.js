"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import Image from "next/image";
import DeveloperNameHighlight from "@/components/ui/developer-name-highlight";
import { helvetica, helveticaCompressed } from "@/components/fonts/fonts";

// Use Helvetica fonts instead of multiple different fonts
const familyName = helvetica;
const comic = helvetica;

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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication verification state
  
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
      console.log('[Payment] Submitting transaction ID');
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
        console.log('[Payment] Transaction submission failed');
        const err = await response.json();
        setError(err.message || "Error submitting transaction");
        setIsLoading(false);
        return;
      }

      // Success: Extract QR code and trigger success state
      console.log('[Payment] Transaction processed successfully');
      const data = await response.json();
      setQrCode(data.qrCode); // Base64 encoded QR code image
      setError(""); // Clear any previous errors
      setPlayMusic(true); // Trigger celebration music
      setIsLoading(false);
    } catch (error) {
      console.log('[Payment] Transaction error:', error.message);
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

  /**
   * Authentication guard - verify token validity on page load
   * Prevents unauthorized access to payment page
   */
  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        console.log('[Payment] No authentication token found, redirecting to login');
        router.push('/Registerme');
        return;
      }

      try {
        // Verify token with backend by making a test API call
        const response = await fetch(api + "api/auth/verify", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log('[Payment] Invalid token, redirecting to login');
          localStorage.removeItem("token"); // Clear invalid token
          localStorage.clear(); // Clear all localStorage data for security
          router.push('/Registerme');
          return;
        }

        console.log('[Payment] Authentication verified');
        setIsAuthenticated(true); // Allow access to payment page
      } catch (error) {
        console.log('[Payment] Token verification failed, redirecting to login');
        localStorage.clear(); // Clear all localStorage data for security
        router.push('/Registerme');
      }
    };

    verifyAuthentication();
  }, [router, api]);

  return (
    <div className="relative container mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-28 pb-24 max-w-6xl" style={{ minHeight: '100vh' }}>
      {/* Show loading screen while authentication is being verified */}
      {!isAuthenticated ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-white">Verifying authentication...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Page-specific background overlay (matches Registrationlanding) */}
          <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
            <div 
              className="w-full h-full"
              style={{
                background: `
                  radial-gradient(circle at 20% 20%, rgba(237, 107, 32, 0.15) 0%, transparent 30%),
                  radial-gradient(circle at 80% 80%, rgba(237, 107, 32, 0.15) 0%, transparent 30%),
                  radial-gradient(circle at 40% 60%, rgba(237, 107, 32, 0.1) 0%, transparent 25%),
                  linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)
                `
              }}
            />
          </div>
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
          <span className={`${familyName.className} text-lg text-white`}>PR KMIT</span>
        </motion.div>
        
        {/* CONDITIONAL RENDERING: Payment Form vs Success Screen */}
        {!qrCode ? (
          // PAYMENT STATE: Before transaction submission - Show payment interface
          <div className="w-full space-y-6">
            {/* Main Payment Card: Orange glass morphism container */}
            <motion.div 
              className="w-full bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-orange-300/20 ring-1 ring-orange-400/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header Section: Title and subtitle */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-5 sm:mb-7 lg:mb-8"
              >
                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-white ${familyName.className} mb-2 sm:mb-3`}>
                  Complete Payment
                </h1>
                <div className="h-px sm:h-0.5 w-16 sm:w-24 bg-white/15 rounded-full mx-auto mb-2"></div>
                <p className={`text-gray-300 ${comic.className} text-sm sm:text-base px-2`}>
                  Scan the QR to pay for your Navraas’25 ticket
                </p>
              </motion.div>

              {/* Two-column layout: Left QR + Form, Right Instructions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
                {/* Left: QR only */}
                <div className="lg:col-span-7">
                  <motion.div 
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <div className="flex items-center justify-center mb-3 sm:mb-4">
                      
                      <h3 className={`text-black text-base sm:text-lg font-bold ml-2 sm:ml-3 ${familyName.className}`}>
                        Scan and make a payment of 150 Rupees
                      </h3>
                    </div>
                    <div className="w-full h-56 sm:h-64 lg:h-80 xl:h-96 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 overflow-hidden">
                      <motion.img
                        src="/newqrkmit.png"
                        alt="Payment QR Code" 
                        className="object-contain h-full w-full max-w-full max-h-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      />
                    </div>
                    <div className="text-center">
                      <p className={`text-gray-700 text-xs sm:text-sm ${comic.className}`}>
                        Use any UPI app to scan and pay
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Right: Instructions pinned to top */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <motion.div 
                    className="p-5 sm:p-6 lg:p-7 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10  lg:top-4"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-indigo-300 text-xl sm:text-2xl mr-2 sm:mr-3"></span>
                      <h4 className={`text-indigo-300 font-semibold ${familyName.className} text-base sm:text-lg`}>
                        Important Instructions
                      </h4>
                    </div>
                    <ul className={`space-y-3 text-gray-300 text-sm sm:text-base leading-relaxed ${comic.className}`}>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Passes are strictly for the student they are issued to and will be invalid if transferred or used by others.
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Entry requires both ticket and College ID card
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Enter the Transaction ID after completing payment
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Entry requires both ticket and College ID card
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Keep your entry pass safe for the event
                      </li>
                    </ul>
                  </motion.div>

                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="space-y-4 sm:space-y-5 bg-white/5 backdrop-blur rounded-xl p-4 sm:p-6 border border-white/10"
                  >
                    <div>
                      <label className={`block text-white text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${familyName.className}`}>
                        Enter Transaction ID
                      </label>
                      <div className="relative">
                        <input
                          id="transactionId"
                          type="text"
                          value={transactionId}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value) && value.length <= 12) {
                              setTransactionId(value);
                            }
                          }}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg text-white bg-neutral-900/80 backdrop-blur rounded-lg sm:rounded-xl border-2 border-neutral-700 focus:border-indigo-500 focus:outline-none transition-all duration-300"
                          placeholder="Enter 12-digit Transaction ID"
                          maxLength={12}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
                          <span className="text-gray-400"></span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isLoading || transactionId.length !== 12}
                      className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform ${
                        isLoading || transactionId.length !== 12
                          ? 'bg-neutral-700 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg hover:scale-105'
                      } text-white ${familyName.className}`}
                      whileHover={!isLoading && transactionId.length === 12 ? { scale: 1.02 } : {}}
                      whileTap={!isLoading && transactionId.length === 12 ? { scale: 0.98 } : {}}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'Submit & Get Entry Pass'
                      )}
                    </motion.button>
                  </motion.form>

                  {/* Error */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl"
                    >
                      <p className={`text-red-300 text-center text-sm sm:text-base ${comic.className}`}>
                        {error}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Footer: Developer credits */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-center mt-6"
              >
                <p className={`text-gray-500 text-xs sm:text-sm ${comic.className}`}>
                  Designed and Developed by 
                  <DeveloperNameHighlight className="mx-1" gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.6)">Vardaan Arora Bhatia</DeveloperNameHighlight>
                  and
                  <DeveloperNameHighlight className="ml-1" gradient="from-orange-300 via-orange-200 to-orange-100" glowColor="rgba(237,107,32,0.6)">Arnav Agarwal</DeveloperNameHighlight>
                </p>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          /* SUCCESS STATE: Entry Pass Generated - two-column layout */
          <div className="w-full space-y-6">
            <motion.div 
              className="w-full bg-neutral-900/60 backdrop-blur rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-neutral-800 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-indigo-500/10"></div>

              {/* Success header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-5 sm:mb-7 lg:mb-8 relative z-10"
              >
                <motion.div 
                  className="bg-green-600 rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
                >
                  <motion.svg
                    className="w-8 sm:w-10 h-8 sm:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                </motion.div>
                <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-semibold text-white ${familyName.className} mb-2`}>
                  Payment Successful!
                </h1>
                <p className={`text-gray-300 ${comic.className} text-sm sm:text-base px-2`}>
                  Your Navraas'25 entry pass is ready
                </p>
              </motion.div>

              {/* Two-column grid: Left QR, Right instructions + download */}
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
                {/* Left: QR */}
                <motion.div 
                  className="lg:col-span-7 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="text-center mb-3 sm:mb-4">
                    <h3 className={`text-black text-base sm:text-lg lg:text-xl font-bold ${familyName.className}`}>
                      Your Entry Pass
                    </h3>
                    <p className={`text-gray-600 text-xs sm:text-sm ${comic.className}`}>
                      Present this QR code at the event entrance
                    </p>
                  </div>
                  <div className="w-full h-56 sm:h-64 lg:h-80 xl:h-96 bg-gray-100 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden">
                    <motion.img
                      src={qrCode}
                      alt="Your Navraas'25 Entry Pass"
                      className="object-contain h-full w-full max-h-full max-w-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    />
                  </div>
                </motion.div>

                {/* Right: Instructions then download button */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <motion.div 
                    className="p-4 sm:p-5 lg:p-6 bg-white/5 rounded-lg sm:rounded-xl border border-white/10"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <div className="flex items-center mb-3 sm:mb-4">
                      {/* Removed emoji as requested */}
                      <h4 className={`text-white font-semibold ${familyName.className} text-sm sm:text-base`}>
                        You're All Set!
                      </h4>
                    </div>
                    <ul className={`space-y-2 sm:space-y-3 text-gray-300 text-xs sm:text-sm ${comic.className}`}>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Download and save this QR code securely
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        Do you have a Dandiya partner? Better find one!
                      </li>
                      <li className="flex items-start">
                        <span className="text-indigo-300 mr-2 mt-1">•</span>
                        See you at Navraas'25 for an unforgettable night!
                      </li>
                    </ul>
                  </motion.div>

                  <motion.button
                    onClick={handleDownload}
                    className={`w-full py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${familyName.className}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span>Download Entry Pass</span>
                    </div>
                  </motion.button>

                  {/* Follow Us Button */}
                  <motion.button
                    onClick={() => window.open('https://www.instagram.com/pr.kmit/', '_blank')}
                    className={`w-full py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${familyName.className}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Follow Us</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </>
      )}
    </div>
  );
}
