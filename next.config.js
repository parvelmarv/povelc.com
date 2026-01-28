/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Turbopack (Next.js 16 default) with no custom configuration.
  // Removed the no-op webpack config to avoid conflicts with Turbopack.
  turbopack: {},
};

module.exports = nextConfig;