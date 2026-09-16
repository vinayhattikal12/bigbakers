const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const scenes = [
  { file: 'scene1.zip', dirName: 'scene1', partDir: 'part-1' },
  { file: 'scene2.zip', dirName: 'scene2', partDir: 'part-2' },
  { file: 'scene3.zip', dirName: 'scene3', partDir: 'part-3' }
];

scenes.forEach(s => {
  if (!fs.existsSync(s.file)) {
    console.warn('File not found:', s.file);
    return;
  }

  // Extract into public/cinematic/scene1 (and also public/cinematic/part-1 for backward compatibility)
  const destDir1 = path.join('public', 'cinematic', s.dirName);
  const destDir2 = path.join('public', 'cinematic', s.partDir);

  fs.mkdirSync(destDir1, { recursive: true });
  fs.mkdirSync(destDir2, { recursive: true });

  console.log(`Extracting ${s.file} to ${destDir1} and ${destDir2}...`);
  cp.execSync(`tar -xf "${s.file}" -C "${destDir1}"`);
  
  // Also copy/extract to partDir
  cp.execSync(`tar -xf "${s.file}" -C "${destDir2}"`);

  const files1 = fs.readdirSync(destDir1);
  console.log(`${s.file} -> Extracted ${files1.length} frames.`);
});

console.log('All scene frames extracted and ready.');
