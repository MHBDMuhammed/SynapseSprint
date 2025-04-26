#!/usr/bin/env node

import { execSync } from 'child_process';
import os from 'os';

// Log Node.js version and environment
console.log('Node.js version:', process.version);
console.log('Platform:', process.platform);
console.log('Current user:', os.userInfo().username);

try {
  // Install Vite globally
  console.log('Installing Vite globally...');
  execSync('npm install -g vite@4.4.5', { stdio: 'inherit' });

  // Show where global packages are installed
  console.log('Global npm packages location:');
  execSync('npm root -g', { stdio: 'inherit' });

  // Show the vite executable path if possible
  try {
    console.log('Vite executable path:');
    if (process.platform === 'win32') {
      execSync('where vite', { stdio: 'inherit' });
    } else {
      execSync('which vite', { stdio: 'inherit' });
    }
  } catch (e) {
    console.warn('Could not find vite path, but continuing...');
  }

  // Execute Vite build using global installation
  console.log('Running Vite build...');
  try {
    execSync('vite build', { stdio: 'inherit' });
  } catch (e) {
    console.log('Trying with npx...');
    execSync('npx --no-install vite build', { stdio: 'inherit' });
  }

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
} 