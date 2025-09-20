import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              svgo: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
      },
    ],
  },
  allowedDevOrigins: ["*.ngrok-free.app"],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
