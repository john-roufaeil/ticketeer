import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "res.cloudinary.com",
      "via.placeholder.com",
      "imgur.com",
    ],
  },
};

export default nextConfig;
