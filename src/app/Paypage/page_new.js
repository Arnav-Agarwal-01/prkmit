"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeroHighlight } from "src/components/ui/hero-highlight.tsx";
import { useWindowSize } from "react-use";
import localFont from "next/font/local";

// Load custom fonts
const familyName = localFont({
  src: "../../../public/fonts/Sora/Sora-VariableFont_wght.ttf",
});

const comic = localFont({
  src: "../../../public/fonts/Comic_Relief/ComicRelief-Regular.ttf"
});

export default function HeroHighlightDemo() {
  const router = useRouter();
  
  const [transactionId, setTransactionId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [playMusic, setPlayMusic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const api = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { width, height } = useWindowSize();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(api+"api/transaction/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ transactionid: transactionId }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.message || "Error submitting transaction");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setError("");
      setPlayMusic(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setError("Failed to submit transaction. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'navraas25-entry-pass.png';
    link.click();
  };

  useEffect(() => {
    let bgmAudio;
    if (playMusic) {
      bgmAudio = new Audio("/subhbgm.mp3");
      bgmAudio.play();
      return () => {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
      };
    }
  }, [playMusic]);

  return (
    <HeroHighlight containerClassName="min-h-screen flex justify-center items-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <div className="relative flex flex-col items-center w-full max-w-lg">
        {!qrCode ? (
          <motion.div 
            className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent ${familyName.className} mb-4`}>
                Complete Your Payment
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full mx-auto mb-4"></div>
              <p className={`text-gray-300 ${comic.className}`}>
                Scan the QR code to pay for your Navraas'25 ticket
              </p>
            </motion.div>

            {/* QR Code Section */}
            <motion.div 
              className="bg-white rounded-2xl p-6 mb-6 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-full p-3">
                  <span className="text-white text-2xl">💳</span>
                </div>
                <h3 className={`text-black text-lg font-bold ml-3 ${familyName.className}`}>
                  Scan to Pay
                </h3>
              </div>
              
              <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <motion.img
                  src="/newqrkmit.png" 
                  alt="Payment QR Code" 
                  className="object-contain h-full w-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
              </div>
              
              <div className="text-center">
                <p className={`text-gray-700 text-sm ${comic.className}`}>
                  Use any UPI app to scan and pay
                </p>
              </div>
            </motion.div>

            {/* Transaction Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div>
                <label className={`block text-white text-lg font-semibold mb-3 ${familyName.className}`}>
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
                    className="w-full px-4 py-4 text-lg text-white bg-black/50 backdrop-blur-lg rounded-xl border-2 border-gray-600 focus:border-orange-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter 12-digit Transaction ID"
                    maxLength={12} 
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-gray-400">💳</span>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || transactionId.length !== 12}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  isLoading || transactionId.length !== 12
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:scale-105'
                } text-white ${familyName.className}`}
                whileHover={!isLoading && transactionId.length === 12 ? { scale: 1.02 } : {}}
                whileTap={!isLoading && transactionId.length === 12 ? { scale: 0.98 } : {}}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "🎫 Submit & Get Entry Pass"
                )}
              </motion.button>
            </motion.form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
              >
                <p className={`text-red-400 text-center ${comic.className}`}>{error}</p>
              </motion.div>
            )}
            
            {/* Instructions */}
            <motion.div 
              className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-purple-600/10 rounded-xl border border-orange-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center mb-3">
                <span className="text-orange-400 text-xl mr-3">📋</span>
                <h4 className={`text-orange-400 font-bold ${familyName.className}`}>
                  Important Instructions
                </h4>
              </div>
              <ul className={`space-y-2 text-gray-300 text-sm ${comic.className}`}>
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

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-6"
            >
              <p className={`text-white text-sm ${comic.className}`}>
                Designed and Developed by{' '}
                <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent font-bold">
                  Vardaan Bhatia & Arnav Agarwal
                </span>
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Success State - Entry Pass Generated */
          <motion.div 
            className="w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            {/* Celebration Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-pink-500/20 to-purple-600/20"></div>
            
            {/* Success Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-8 relative z-10"
            >
              <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">✅</span>
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent ${familyName.className} mb-2`}>
                Payment Successful!
              </h1>
              <p className={`text-gray-300 ${comic.className}`}>
                Your Navraas'25 entry pass is ready
              </p>
            </motion.div>

            {/* Entry Pass QR Code */}
            <motion.div 
              className="bg-white rounded-2xl p-6 mb-6 shadow-lg relative z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-center mb-4">
                <h3 className={`text-black text-xl font-bold ${familyName.className}`}>
                  🎭 Your Entry Pass 🎭
                </h3>
                <p className={`text-gray-600 text-sm ${comic.className}`}>
                  Present this QR code at the event entrance
                </p>
              </div>
              
              <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                <motion.img
                  src={qrCode}
                  alt="Your Navraas'25 Entry Pass"
                  className="object-contain h-full w-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                />
              </div>
            </motion.div>

            {/* Download Button */}
            <motion.button
              onClick={handleDownload}
              className={`w-full py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-6 ${familyName.className} relative z-10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📱</span>
                <span>Download Entry Pass</span>
              </div>
            </motion.button>

            {/* Success Instructions */}
            <motion.div 
              className="p-6 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <div className="flex items-center mb-3">
                <span className="text-green-400 text-xl mr-3">🎉</span>
                <h4 className={`text-green-400 font-bold ${familyName.className}`}>
                  You're All Set!
                </h4>
              </div>
              <ul className={`space-y-2 text-gray-300 text-sm ${comic.className}`}>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Download and save this QR code securely
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Do you have a Dandiya partner? Better find one! 💃🕺
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  See you at Navraas'25 for an unforgettable night!
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </div>
    </HeroHighlight>
  );
}
