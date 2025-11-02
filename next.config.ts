import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://auth-demo-api.onrender.com/:path*',
      },
    ]
  },
};

export default nextConfig;
