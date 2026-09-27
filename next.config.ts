import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.45.105",
    "192.168.45.105:3000",
    "localhost:3000",
  ],
};

export default nextConfig;
