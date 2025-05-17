"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formFocus, setFormFocus] = useState(null);

  // Reset success message after 5 seconds
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => setSuccess(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Responsive height spacer div to push content down */}
      <div className="h-[50px] sm:h-[70px]"></div>
      
      <div className="min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-4 relative overflow-hidden" style={{ pointerEvents: 'auto', zIndex: 50 }}>
        {/* Animated background elements */}
        <div className="absolute overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-5xl" />
          <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-5xl" />
        </div>
        
        <div className="w-full max-w-4xl relative" style={{ pointerEvents: 'auto', zIndex: 60 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 mb-4 sm:mb-6 tracking-tight">
              Get In Touch
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg px-2">
              Have questions or want to collaborate? We're here to help bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 sm:gap-8">
            {/* Contact info section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-800/50 shadow-xl"
              style={{ pointerEvents: 'auto' }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-300 font-medium">Email</h3>
                    <a href="mailto:pr@kmit.in" className="text-purple-400 hover:text-purple-300 transition-colors">
                      pr@kmit.in
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500/20 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-gray-300 font-medium">Location</h3>
                    <p className="text-gray-400">KMIT Campus, Narayanaguda</p>
                  </div>
                </div>
                
                
              </div>
            </motion.div>
            
            {/* Form section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-3 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-800/50 shadow-xl relative overflow-hidden"
              style={{ pointerEvents: 'auto' }}
            >
              {/* Success message */}
              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-b border-green-500/30 backdrop-blur-sm p-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-400 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-300">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                  <button onClick={() => setSuccess(false)} className="text-green-400 hover:text-green-300">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
              )}
              
              {/* Error message */}
              {error && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
                  <p className="flex items-center">
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" style={{ pointerEvents: 'auto' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 rounded-lg transition-opacity duration-300 -z-10 ${formFocus === 'name' ? 'opacity-20' : ''}`}></div>
                    <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300">Your Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setFormFocus('name')}
                        onBlur={() => setFormFocus(null)}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg py-2.5 sm:py-3 pl-10 pr-3 sm:pr-4 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Your Name"
                        style={{ pointerEvents: 'auto' }}
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 rounded-lg transition-opacity duration-300 -z-10 ${formFocus === 'email' ? 'opacity-20' : ''}`}></div>
                    <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300">Your Email</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFormFocus('email')}
                        onBlur={() => setFormFocus(null)}
                        required
                        className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg py-2.5 sm:py-3 pl-10 pr-3 sm:pr-4 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                        placeholder="Email"
                        style={{ pointerEvents: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 rounded-lg transition-opacity duration-300 -z-10 ${formFocus === 'message' ? 'opacity-20' : ''}`}></div>
                  <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-gray-300">Your Message</label>
                  <div className="relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={() => setFormFocus('message')}
                      onBlur={() => setFormFocus(null)}
                      required
                      className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-lg p-3 sm:p-4 h-32 sm:h-40 text-sm sm:text-base focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-500"
                      placeholder="Your Message Please ..."
                      style={{ pointerEvents: 'auto' }}
                    />
                  </div>
                </div>
                
                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-2.5 sm:py-3 px-4 sm:px-6 overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                    <div className="flex items-center justify-center">
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </>
                      ) : 'Send Message'}
                    </div>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactPage;