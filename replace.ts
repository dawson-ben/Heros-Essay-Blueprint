import fs from 'fs';
['src/components/HerosJourneyCompare.tsx', 'src/components/InteractiveGuidebook.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/indigo/g, 'blue');
  fs.writeFileSync(file, content);
});
