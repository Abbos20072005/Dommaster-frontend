import type { NextConfig } from 'next';

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  env: {
    YANDEX_KEY: process.env.YANDEX_KEY,
    SUGGEST_KEY: process.env.SUGGEST_KEY,
    API_URL: process.env.API_URL
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '**'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default withNextIntl(nextConfig);
