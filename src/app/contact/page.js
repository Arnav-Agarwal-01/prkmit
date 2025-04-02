"use client";
import React, { useState } from 'react';


function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    <div className="max-w-md mx-auto p-4 relative z-[1000] mt-24 sm:mt-64 bg-white shadow-lg rounded-xl" style={{ pointerEvents: 'auto' }}>
      <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Contact Us</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && (
        <p className="text-green-500 mb-4">
          Message sent successfully!
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <div>
          <label className="block mb-2 font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded text-black placeholder:text-gray-500"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded text-black placeholder:text-gray-500"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-2 border rounded h-32 text-black placeholder:text-gray-500"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default ContactPage;