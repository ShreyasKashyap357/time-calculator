/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: 'export', // Export as a static site
    basePath: '/time-calculator', // Change 'time-calculator' to your repository name
    assetPrefix: '/time-calculator/', // Change to your repository name
    };

export default nextConfig;