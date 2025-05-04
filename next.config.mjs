/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add any external domains if needed
    unoptimized: process.env.NODE_ENV === 'development', // Only optimize in production
  },
};

export default nextConfig;
