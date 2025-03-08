const fs = require('fs');
const path = require('path');

const filesToMove = ['http.js', 'http.d.ts', 'router.js', 'router.d.ts', 'server.js', 'server.d.ts',];
const srcDir = path.join(__dirname, '..', 'dist');
const destDir = path.join(__dirname, '..');

filesToMove.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, destPath);
        console.log(`Moved ${file} to root directory.`);
    } else {
        console.log(`File ${file} does not exist in dist directory.`);
    }
});