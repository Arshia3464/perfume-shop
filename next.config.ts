import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.chbkn.run",
      },
    ],
    // 🚨 THIS IS THE FIX: Stops Next.js from throwing an error over private/local network routing blocks
    unoptimized: true,
  },
};

export default nextConfig;
