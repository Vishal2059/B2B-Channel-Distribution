/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow access from your local network IP
  allowedDevOrigins: ["192.168.2.164"],

  cacheComponents: true,
  partialPrefetching: true,

  // Allow external images in next/image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;