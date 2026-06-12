const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(file, 'utf8');

// The icon containers
content = content.replace(/className="p-3.5 rounded-2xl bg-black\/5 dark:bg-black\/5 text-black mb-6 w-fit transition-colors group-hover:bg-black\/5"/g, 'className={`p-3.5 rounded-2xl mb-6 w-fit transition-colors ${t.iconBg}`}');
content = content.replace(/className="p-3.5 rounded-2xl bg-black\/5 dark:bg-black\/5 text-black transition-colors group-hover:bg-black\/5"/g, 'className={`p-3.5 rounded-2xl transition-colors ${t.iconBg}`}');

content = content.replace(/group-hover:text-black/g, '');

content = content.replace(/from-black to-transparent/g, 'from-white/5 to-transparent');

fs.writeFileSync(file, content);
console.log('App.tsx updated for icons');
