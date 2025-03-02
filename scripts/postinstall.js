// Run a Post - Install Script
// This script runs automatically after npm install, useful for setting up dependencies.

console.log('🔧 Running post-install tasks...');
require('child_process').execSync('npx expo prebuild', { stdio: 'inherit' });
console.log('✅ Post-install setup complete.');
