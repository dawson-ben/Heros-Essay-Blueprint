import fs from 'fs';
import path from 'path';

function walk(dir: string) {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.push('./package.json');
files.push('./index.html');
files.push('./vite.config.ts');
files.push('./tailwind.config.js'); // if it exists
files.push('./tsconfig.json');
files.push('./tsconfig.app.json');
files.push('./tsconfig.node.json');

let output = '';

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  output += `\n\n--- FILE: ${file} ---\n\n`;
  output += fs.readFileSync(file, 'utf8');
}

fs.writeFileSync('app_code_export.txt', output, 'utf8');
console.log('Exported to app_code_export.txt');
