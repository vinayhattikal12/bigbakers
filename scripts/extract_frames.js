const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const zips = [
  { file: 'ezgif-1f5d96cfab73decd-png-split.zip', dest: 'public/cinematic/part-1' },
  { file: 'ezgif-734afca7283ce496-png-split.zip', dest: 'public/cinematic/part-2' },
  { file: 'ezgif-7ed5a37e3bd9ce6a-png-split.zip', dest: 'public/cinematic/part-3' }
];

zips.forEach(z => {
  fs.mkdirSync(z.dest, { recursive: true });
  console.log('Extracting ' + z.file + ' to ' + z.dest + '...');
  cp.execSync('tar -xf "' + z.file + '" -C "' + z.dest + '"');
  const files = fs.readdirSync(z.dest);
  console.log('Successfully extracted ' + files.length + ' frames to ' + z.dest);
});
