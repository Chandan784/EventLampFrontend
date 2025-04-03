/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    port: process.env.PORT || 4000,
  },
};

export default nextConfig;
