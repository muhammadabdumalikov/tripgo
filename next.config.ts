import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "trippo-urb1.vercel.app",
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
        destination: "http://116.202.26.85:3001/api/:path*",
      },
      {
        source: "/img/:path*",
        destination: "http://116.202.26.85:9000/travelapp/:path*",
      },
    ];
  },
};

export default nextConfig;
