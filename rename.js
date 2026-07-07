const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.md') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(process.cwd());

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Global replacements
  content = content.replace(/Aegis StadiumOS/g, 'PitchControl');
  content = content.replace(/StadiumOS/g, 'PitchControl');
  content = content.replace(/aegis-stadiumos/g, 'pitchcontrol');
  content = content.replace(/aegis-stadium-os/g, 'pitchcontrol');

  // Specific for logo
  if (file.replace(/\\/g, '/').endsWith('components/aegis/logo.tsx')) {
    content = content.replace(/AEGIS/g, 'PITCH');
    content = content.replace(/PitchControl/g, 'CONTROL'); 
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  }
});
