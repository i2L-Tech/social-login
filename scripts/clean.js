// Clean Cache & Reinstall Dependencies

const { execSync } = require('child_process');

console.log('🧹 Cleaning project...');

execSync('rm -rf node_modules package-lock.json yarn.lock', { stdio: 'inherit' });
execSync('expo r -c', { stdio: 'inherit' });

console.log('✅ Project cleaned. Now run `npm install`.');
