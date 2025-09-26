"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TextAnimate } from "@/components/magicui/text-animate";
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function RetrieveQRPage() {
  const [formData, setFormData] = useState({
    hallticketno: '',
    parentphone: ''
  });
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrData(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000';
      const response = await fetch(`${apiBaseUrl}api/auth/getqr`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setQrData(data.user);
        toast.success('QR Code retrieved successfully!');
      } else {
        setError(data.msg || 'Failed to retrieve QR code');
        toast.error(data.msg || 'Failed to retrieve QR code');
      }
    } catch (error) {
      const errorMsg = 'Network error. Please check if the server is running.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (qrData && qrData.qrcode) {
      const link = document.createElement('a');
      link.href = qrData.qrcode;
      link.download = `${qrData.hallticketno}_qr_code.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('QR Code downloaded!');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Page-specific background overlay (matches Paypage) */}
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
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TextAnimate className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Retrieve Your QR Code
          </TextAnimate>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Enter your roll number and the last 4 digits of your parent's phone number to retrieve your pass QR code.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Two Column Layout - Form and QR Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <motion.form 
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-6 border border-orange-300/20 ring-1 ring-orange-400/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="hallticketno" className="block text-sm font-medium text-white/80 mb-2">
                    Hall Ticket Number (Roll Number)
                  </label>
                  <input
                    type="text"
                    id="hallticketno"
                    name="hallticketno"
                    value={formData.hallticketno}
                    onChange={handleInputChange}
                    placeholder="Enter your 10-digit roll number"
                    maxLength="10"
                    className="w-full px-4 py-3 bg-neutral-900/80 backdrop-blur border-2 border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="parentphone" className="block text-sm font-medium text-white/80 mb-2">
                    Last 4 Digits of Parent's Phone
                  </label>
                  <input
                    type="text"
                    id="parentphone"
                    name="parentphone"
                    value={formData.parentphone}
                    onChange={handleInputChange}
                    placeholder="Enter last 4 digits"
                    maxLength="4"
                    pattern="[0-9]{4}"
                    className="w-full px-4 py-3 bg-neutral-900/80 backdrop-blur border-2 border-neutral-700 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-0 focus:border-orange-500 transition-all duration-300"
                    required
                  />
                </div>

                {error && (
                  <motion.div 
                    className="p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg sm:rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-red-300 text-center text-sm sm:text-base">
                      {error}
                    </p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={loading || !formData.hallticketno || !formData.parentphone}
                  className={`w-full mt-6 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform ${
                    loading || !formData.hallticketno || !formData.parentphone
                      ? 'bg-neutral-700 cursor-not-allowed text-gray-400'
                      : 'bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg hover:scale-105 text-white'
                  }`}
                >
                  {loading ? 'Retrieving...' : 'Get QR Code'}
                </button>
              </div>
            </motion.form>

            {/* Right Column - QR Code Display */}
            {qrData ? (
              <motion.div 
                className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl p-6 border border-orange-300/20 ring-1 ring-orange-400/20 relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-orange-500/5"></div>
                
                <div className="relative z-10 text-center">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Welcome, {qrData.firstname} KMIT!</h3>
                    <p className="text-white/60 mb-2">Roll Number: {qrData.hallticketno}</p>
                    <p className="text-gray-300 text-sm">Your Navraas'25 entry pass is ready</p>
                  </div>

                  {/* QR Code */}
                  <motion.div
                    className="bg-white p-6 rounded-2xl shadow-xl mx-auto max-w-sm mb-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Image
                      src={qrData.qrcode}
                      alt="Your QR Code"
                      width={280}
                      height={280}
                      className="w-full h-auto"
                    />
                  </motion.div>

                  {/* Download Button */}
                  <motion.button
                    onClick={downloadQR}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    Download QR Code
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-gradient-to-br from-orange-500/5 to-orange-600/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-orange-300/10 p-6 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Your QR code will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}