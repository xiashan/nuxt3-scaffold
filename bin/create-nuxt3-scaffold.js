#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify the project name:');
  console.error('  npm create nuxt3-scaffold my-app');
  process.exit(1);
}

const currentDir = process.cwd();
const projectDir = path.join(currentDir, projectName);

try {
  fs.mkdirSync(projectDir);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.error(`The directory ${projectName} already exists in the current directory`);
  } else {
    console.error(err);
  }
  process.exit(1);
}

const templateDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../template');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy template files
console.log(`Creating a new Nuxt3 project in ${projectDir}...`);
copyDir(templateDir, projectDir);

// Initialize git repository
// console.log('Initializing git repository...');
// execSync('git init', { cwd: projectDir });

console.log('Installing dependencies...');
execSync('npm install', { cwd: projectDir, stdio: 'inherit' });

console.log(`
Success! Created ${projectName} at ${projectDir}
Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm run generate
    Generate static pages.

  npm run preview
    Preview the production build.

We suggest that you begin by typing:

  cd ${projectName}
  npm run dev

Happy coding!
`); 