import { execSync } from 'child_process';
import fs from 'fs';

// Ensure permissions
try {
  console.log('Setting permissions for node_modules/.bin directory...');
  execSync('chmod -R 755 ./node_modules/.bin', { stdio: 'inherit' });
} catch (error) {
  console.error('Error setting permissions:', error.message);
}

// Run the build
try {
  console.log('Building the application...');
  execSync('node_modules/.bin/vite build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}

console.log('Build completed successfully!'); 