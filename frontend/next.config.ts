import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    'wagmi',
    'viem',
    '@reown/appkit',
    '@reown/appkit-adapter-wagmi',
    '@tanstack/react-query',
    '@coinbase/wallet-sdk',
  ],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      accounts: false,
    };
    return config;
  },
};

export default nextConfig;