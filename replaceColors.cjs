const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  // App.tsx specific hero text gradient
  [/className="bg-linear-to-r from-cyan-300 via-cyan-400 to-sky-400 bg-clip-text text-transparent"/g, 'className="text-black"'],
  [/className="bg-linear-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"/g, 'className="text-black"'],

  // Gradients
  [/bg-linear-to-[a-z]+ from-cyan-\d+(\/\d+)? (via-cyan-\d+ )?to-[a-z]+-\d+(\/\d+)?/g, 'bg-black text-white'],
  [/bg-gradient-to-[a-z]+ from-cyan-\d+(\/\d+)? to-[a-z]+-\d+(\/\d+)?/g, 'bg-black text-white'],
  [/from-cyan-\d+(\/\d+)?/g, 'from-black'],
  [/via-cyan-\d+(\/\d+)?/g, 'via-black'],
  [/to-blue-\d+(\/\d+)?/g, 'to-transparent'],
  [/to-sky-\d+(\/\d+)?/g, 'to-transparent'],
  [/to-indigo-\d+(\/\d+)?/g, 'to-transparent'],
  
  // Text
  [/text-cyan-\d+/g, 'text-black'],
  [/group-hover:text-cyan-\d+/g, 'group-hover:text-black'],
  [/hover:text-cyan-\d+/g, 'hover:text-black'],
  
  // Borders
  [/border-cyan-\d+(\/\d+)?/g, 'border-black/20'],
  [/hover:border-cyan-\d+(\/\d+)?/g, 'hover:border-black/30'],
  [/focus:border-cyan-\d+(\/\d+)?/g, 'focus:border-black/30'],
  [/peer-focus:ring-cyan-\d+(\/\d+)?/g, 'peer-focus:ring-black/20'],
  [/border-t-cyan-\d+/g, 'border-t-black'],
  
  // Backgrounds
  [/bg-cyan-\d+(\/\d+)?/g, 'bg-black/5'],
  [/hover:bg-cyan-\d+(\/\d+)?/g, 'hover:bg-black/10'],
  [/group-hover:bg-cyan-\d+(\/\d+)?/g, 'group-hover:bg-black/10'],
  
  // Rings
  [/ring-cyan-\d+(\/\d+)?/g, 'ring-black/20'],
  [/focus:ring-cyan-\d+(\/\d+)?/g, 'focus:ring-black/20'],
  
  // Shadows
  [/shadow-cyan-\d+(\/\d+)?/g, 'shadow-black/10'],
  [/hover:shadow-cyan-\d+(\/\d+)?/g, 'hover:shadow-black/20'],
  [/shadow-\[0_0_15px_rgba\(6,182,212,0\.1\)\]/g, 'shadow-sm'],
  [/shadow-\[0_0_35px_rgba\(6,182,212,0\.15\)\]/g, 'shadow-md'],
  
  // Blue/Teal specific
  [/text-blue-\d+/g, 'text-black'],
  [/bg-blue-\d+(\/\d+)?/g, 'bg-black/5'],
  [/border-blue-\d+(\/\d+)?/g, 'border-black/20'],
];

function processDirectory(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      replacements.forEach(([regex, replacement]) => {
        content = content.replace(regex, replacement);
      });
      if (content !== original) {
        console.log(`Updated ${fullPath}`);
        fs.writeFileSync(fullPath, content);
      }
    }
  });
}

processDirectory(directoryPath);
