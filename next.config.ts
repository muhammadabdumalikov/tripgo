import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tripgo-urb1.vercel.app",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://37.60.231.13:3001/api/:path*",
      },
      {
        source: "/img/:path*",
        destination: "http://37.60.231.13:9000/travelapp/:path*",
      },
    ];
  },
};

export default nextConfig;
