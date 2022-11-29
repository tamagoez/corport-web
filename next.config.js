/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports =  {nextConfig,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
}