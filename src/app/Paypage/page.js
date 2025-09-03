"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import localFont from "next/font/local";

// Load custom fonts for consistent branding
const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
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
        {/* Content Wrapper: Responsive container with proper spacing and max-width */}
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 pt-20 sm:pt-24 lg:pt-28 pb-24 max-w-2xl" style={{ minHeight: '100vh' }}>
        
        {/* CONDITIONAL RENDERING: Payment Form vs Success Screen */}
        {!qrCode ? (
          // PAYMENT STATE: Before transaction submission - Show payment interface
          <div className="w-full space-y-6">
            {/* Main Payment Card: Glass morphism container */}
            <motion.div 
              className="w-full bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-white/20"
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
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ${familyName.className} mb-2 sm:mb-4`}>
                Complete Your Payment
              </h1>
              {/* Decorative underline */}
              <div className="h-0.5 sm:h-1 w-16 sm:w-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mx-auto mb-2 sm:mb-4"></div>
              {/* Subtitle instruction */}
              <p className={`text-gray-300 ${comic.className} text-sm sm:text-base px-2`}>
                Scan the QR code to pay for your Navraas'25 ticket
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
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-full p-2 sm:p-3">
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
              className="space-y-4 sm:space-y-6 bg-white/5 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10"
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
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg text-white bg-black/50 backdrop-blur-lg rounded-lg sm:rounded-xl border-2 border-gray-600 focus:border-orange-500 focus:outline-none transition-all duration-300"
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
                    ? 'bg-gray-600 cursor-not-allowed' // Disabled state
                    : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105' // Active state with gradient
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
              className="p-4 sm:p-6 bg-gradient-to-r from-orange-500/10 to-purple-600/10 rounded-xl border border-orange-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {/* Instructions header */}
              <div className="flex items-center mb-3">
                <span className="text-orange-400 text-lg sm:text-xl mr-2 sm:mr-3">📋</span>
                <h4 className={`text-orange-400 font-bold ${familyName.className} text-sm sm:text-base`}>
                  Important Instructions
                </h4>
              </div>
              {/* Bulleted list of important guidelines */}
              <ul className={`space-y-2 text-gray-300 text-xs sm:text-sm ${comic.className}`}>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Enter the Transaction ID after completing payment
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
                  Entry requires both ticket and valid ID card
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">•</span>
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
              <p className={`text-gray-400 text-xs sm:text-sm ${comic.className}`}>
                Designed and Developed by{' '}
                <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent font-bold">
                  Vardaan & Arnav
                </span>
              </p>
            </motion.div>
          </motion.div>
          </div>
        ) : (
          /* SUCCESS STATE: Entry Pass Generated - Shows after successful payment */
          <div className="w-full space-y-6">
            {/* Entry Pass Card: Main success container with celebration theme */}
            <motion.div 
              className="w-full bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-white/20 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
            {/* Celebration Background: Colorful overlay for success state */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-600/20"></div>
            
            {/* Success Header: Confirmation message with checkmark */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-4 sm:mb-6 lg:mb-8 relative z-10"
            >
              {/* Success checkmark icon */}
              <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white text-2xl sm:text-3xl">✅</span>
              </div>
              {/* Success title with green gradient */}
              <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent ${familyName.className} mb-2`}>
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
              className={`w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4 sm:mb-6 ${familyName.className} relative z-10`}
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
              className="p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg sm:rounded-xl border border-green-500/20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {/* Success instructions header */}
              <div className="flex items-center mb-2 sm:mb-3">
                <span className="text-green-400 text-lg sm:text-xl mr-2 sm:mr-3">🎉</span>
                <h4 className={`text-green-400 font-bold ${familyName.className} text-sm sm:text-base`}>
                  You're All Set!
                </h4>
              </div>
              {/* Final instructions for successful registration */}
              <ul className={`space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm ${comic.className}`}>
                <li className="flex items-start">
                  <span className="text-green-400 mr-1 sm:mr-2">•</span>
                  Download and save this QR code securely
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-1 sm:mr-2">•</span>
                  Do you have a Dandiya partner? Better find one! 💃🕺
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-1 sm:mr-2">•</span>
                  See you at Navraas'25 for an unforgettable night!
                </li>
              </ul>
            </motion.div>
          </motion.div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
