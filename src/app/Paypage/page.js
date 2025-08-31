"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HeroHighlight } from "src/components/ui/hero-highlight.tsx";

import { useWindowSize } from "react-use";

// copying this - Arnav
export default function HeroHighlightDemo() {
  const router = useRouter();
  
  const [transactionId, setTransactionId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");
  const [playMusic, setPlayMusic] = useState(false);
  const api = process.env.NEXT_PUBLIC_API_ENDPOINT;
  // Get the window size
  const { width, height } = useWindowSize();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No token found. Please log in.");
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
        return;
      }

      const data = await response.json();
      setQrCode(data.qrCode);
      setError("");
      setPlayMusic(true); // Trigger the BGM when QR code is set
    } catch (error) {
      console.error("Error submitting transaction:", error);
      setError("Failed to submit transaction. Please try again.");
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qr-code.png';
    link.click();
  };

  useEffect(() => {
    let bgmAudio;
    if (playMusic) {
      bgmAudio = new Audio("/subhbgm.mp3"); // Make sure your BGM is in the public folder
      bgmAudio.play();
      return () => {
        bgmAudio.pause();
        bgmAudio.currentTime = 0;
        
      };
    }
  }, [playMusic]);

  return (
    <HeroHighlight containerClassName="min-h-screen min-w-screen flex justify-center items-center p-8 overflow-hidden">
      <div className="relative flex flex-col items-center w-full max-w-md">
        {!qrCode ? (
          <motion.div 
            className="w-full h-auto mt-20 bg-white rounded-lg shadow-lg p-6"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-center text-black font-semibold text-xl mb-6">
              Scan this QR and Pay, Get the tix or No Entry!
            </h2>

            <div className="w-full h-48 bg-gray-300 flex items-center justify-center mb-6">
              <motion.img
                src="/newqrkmit.png" 
                alt="QR Image Placeholder" 
                className="object-contain h-full w-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionId">
                Enter The Transaction ID:
              </label>

              <input
  id="transactionId"
  type="text"
  value={transactionId}
  onChange={(e) => {
    const value = e.target.value;
    // Allow only digits and ensure the length doesn't exceed 12
    if (/^\d*$/.test(value) && value.length <= 12) {
      setTransactionId(value);
    }
  }}
  onBlur={() => {
    // Add logic to handle cases where the user leaves the field with fewer than 12 digits
    if (transactionId.length < 12) {
      alert("Transaction ID must be exactly 12 digits.");
    
    }
  }}
  className="px-4 py-2 w-full text-lg text-black bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
  placeholder="Enter 12-digit Transaction ID"
  maxLength={12} 
/>


              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full transition duration-300"
              >
                Submit
              </button>
            </motion.form>

            {error && <p className="text-red-500 mt-4">{error}</p>}
            
            <div className="mt-6 p-4 bg-gray-200 text-sm text-gray-700 rounded-lg">
              <p className="font-bold mb-2">Note:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Enter the Transaction ID after paying.</li>
                <li>Without buying the tickets, entry won&apos;t be allowed.</li>
                <li>It is mandatory to have tickets and your ID card for the Entry to the event.</li>
              </ul>
            </div>
            <p className="text-center text-xs mt-4 text-gray-600">
              Designed and Developed by Vardaan
            </p>
          </motion.div>
        ) : (
          <motion.div 
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
           
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-6">
              <motion.img
                src={qrCode}
                alt="Generated QR Code"
                className="object-contain h-full w-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Download QR
            </button>

            <div className="mt-6 p-4 bg-gray-200 text-sm text-gray-700 rounded-lg">
              <p className="font-bold mb-2">Note:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Download this QR to get entry, and yeah don&apos;t share it hehe.</li>
                <li>Trivia question: Do you have a Dandiya partner?</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </HeroHighlight>
  );
}
