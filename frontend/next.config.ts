import type { NextConfig } from 'next';

const rawBackend =
  process.env.BACKEND_URL ||
  (process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL.startsWith('http')
      ? process.env.NEXT_PUBLIC_API_URL
      : `https://${process.env.NEXT_PUBLIC_API_URL}`
    : 'http://localhost:8000');

const backendTarget = rawBackend.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '');

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
    '*.onrender.com',
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendTarget}/api/:path*`,
      },
      {
        source: '/health',
        destination: `${backendTarget}/health`,
      },
    ];
  },
};

export default nextConfig;
