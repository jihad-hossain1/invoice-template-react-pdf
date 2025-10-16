import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
    ],
  },

};

export default nextConfig;
