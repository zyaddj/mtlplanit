/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'images.unsplash.com'
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig; 