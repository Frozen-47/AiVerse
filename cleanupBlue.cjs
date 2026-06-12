const fs = require('fs');
const path = require('path');

const replacements = [
  // App.tsx specific cards
  [/resolvedTheme === 'amoled'[\s\n]+\? 'bg-black border-white\/8 hover:border-black\/20 hover:shadow-md'[\s\n]+: 'bg-white border-slate-200 shadow-md hover:shadow-xl hover:border-black\/20'/g, 't.card'],
  [/className=\{`group relative overflow-hidden p-8 rounded-3xl border text-left transition-all duration-300 cursor-pointer \$\{[\s\n]+t\.card[\s\n]+\}`\}/g, 'className={`group relative overflow-hidden p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer ${t.card}`.trim()}'],

  // Blue shadows
  [/shadow-blue-500\/[0-9]+/g, 'shadow-white/10'],
  
  // Blue gradients
  [/from-blue-500\/[0-9]+/g, 'from-white/5'],
  [/via-blue-500\/[0-9]+/g, 'via-white/5'],
  [/via-blue-50\/[0-9]+/g, 'via-white/5'],
  [/via-blue-500/g, 'via-white/20'],
  
  // Hardcoded bg-black for icons/avatars (change to a slightly lighter dark or pure black is fine, but they asked about SVGs)
  // Let's replace 'bg-black text-white' with t.iconBgSolid if it's an icon container, but maybe that's too broad.

];

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      replacements.forEach(([regex, replacement]) => {
        content = content.replace(regex, replacement);
      });
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  });
}

processDirectory(path.join(__dirname, 'src'));
