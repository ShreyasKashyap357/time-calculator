import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/time-calculator', // Replace with your repository name if different
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.afterEmit.tapPromise('LogAppPathsManifest', async () => {
            const manifestPath = path.join(__dirname, '.next', 'server', 'app-paths-manifest.json');
            try {
              await fs.access(manifestPath);
              console.log('app-paths-manifest.json exists and is accessible');
              const content = await fs.readFile(manifestPath, 'utf8');
              console.log('app-paths-manifest.json content:', content);
            } catch (error) {
              console.error('Error accessing app-paths-manifest.json:', error);
            }
          });
        },
      });
    }
    return config;
  },
};

export default nextConfig;