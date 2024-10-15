/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '143.110.177.97',
        port: '1337',
        pathname: '/uploads/**',
      },{
        protocol: 'https',
        hostname: 'api.24hectares.com',
        pathname: '/uploads/**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
