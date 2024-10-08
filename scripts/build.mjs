import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function build() {
  try {
    console.log('Starting build process...');
    execSync('next build', { stdio: 'inherit' });

    console.log('Waiting for files to be written...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    const manifestPath = path.join(__dirname, '..', '.next', 'server', 'app-paths-manifest.json');
    
    console.log('Checking app-paths-manifest.json...');
    await fs.access(manifestPath);
    
    console.log('app-paths-manifest.json exists, build completed successfully.');

  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();