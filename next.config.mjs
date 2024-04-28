/** @type {import('next').NextConfig} */
// next.config.js


const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibopvveljwnqugabzqnr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: true,
  },
};

export default config;
