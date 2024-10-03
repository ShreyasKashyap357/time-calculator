/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    reactStrictMode: true,
    output: 'export', // Export as a static site
    basePath: isProd ? '/time-calculator' : '', // Change 'time-calculator' to your repository name
    assetPrefix: isProd ? '/time-calculator/' : '', // Change to your repository name
    images: {
        unoptimized: true, // Disable image optimization for static exports
    },
};

export default nextConfig;