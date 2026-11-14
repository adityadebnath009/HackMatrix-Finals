import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'localhost',
    'localhost:3000',
    '10.1.34.167',
    '10.1.34.167:3000',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.ngrok.app',
    '*.loca.lt',
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
      {
        source: '/health',
        destination: 'http://localhost:8000/health',
      },
    ];
  },
};

export default nextConfig;
