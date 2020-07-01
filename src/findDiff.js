import fs from 'fs';
import path from 'path';

export default function findDiff (filePath1, filePath2) {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), `${filePath1}`), 'utf-8');
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), `${filePath2}`), 'utf-8');

  const firstObj = JSON.parse(firstFile);
  const secondObj = JSON.parse(secondFile);

  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);

  const diff = ['{\n'];
  firstObjKeys.forEach((key) => {
    const firstValue = firstObj[key];
    if (secondObj.hasOwnProperty(key)) {
      const secondValue = secondObj[key];
      if (secondValue === firstValue) diff.push(`    ${key}: ${firstValue}\n`);
      else {
        diff.push(`  + ${key}: ${secondValue}\n`);
        diff.push(`  - ${key}: ${firstValue}\n`);
      }
    } else if (!secondObj.hasOwnProperty(key)) {
      diff.push(`  - ${key}: ${firstValue}\n`);
    }
  });

  secondObjKeys.forEach((key) => {
    const secondValue = secondObj[key];
    if (!firstObj.hasOwnProperty(key)) {
      diff.push(`  + ${key}: ${secondValue}\n`);
    }
  });
  diff.push('}');
  console.log(diff.join(''));
}
