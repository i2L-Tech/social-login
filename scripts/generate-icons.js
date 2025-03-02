// Auto - generate App Icons
// If you have different sizes of icons, this script can resize and save them automatically.

const sharp = require('sharp');

sharp('assets/icon.png')
    .resize(1024, 1024)
    .toFile('assets/icon-1024.png', (err) => {
        if (err) console.error('Error resizing icon:', err);
        else console.log('✅ Icon resized to 1024x1024.');
    });
