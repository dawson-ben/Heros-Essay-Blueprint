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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.match(/text-\[(8|9|10)px\]/)) {
    content = content.replace(/text-\[(8|9|10)px\]/g, 'text-[11px]');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Replaced text sizes in ${file}`);
  }
}
