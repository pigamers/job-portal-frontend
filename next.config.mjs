/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  distDir: '.next',
  poweredByHeader: false,
  generateEtags: false,
};

export default nextConfig;