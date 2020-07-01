import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default function findDiff(filePath1, filePath2) {
  const firstFile = fs.readFileSync(path.resolve(process.cwd(), `${filePath1}`), 'utf-8');
  const secondFile = fs.readFileSync(path.resolve(process.cwd(), `${filePath2}`), 'utf-8');

  const firstObj = JSON.parse(firstFile);
  const secondObj = JSON.parse(secondFile);

  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);

  const diff = ['{\n'];
  firstObjKeys.forEach((key) => {
    const valueOfFirstObj = firstObj[key];
    const valueOfSecondObj = secondObj[key];
    const hasObjKey = _.has(secondObj, key);
    switch (hasObjKey) {
      case true:
        if (valueOfSecondObj === valueOfFirstObj) diff.push(`    ${key}: ${valueOfFirstObj}\n`);
        else {
          diff.push(`  + ${key}: ${valueOfSecondObj}\n`);
          diff.push(`  - ${key}: ${valueOfFirstObj}\n`);
        }
        break;
      case false:
        diff.push(`  - ${key}: ${valueOfFirstObj}\n`);
        break;
      default: throw new Error('Something went wrong');
    }
  });

  secondObjKeys.forEach((key) => {
    const valueOfSecondObj = secondObj[key];
    if (!_.has(firstObj, key)) {
      diff.push(`  + ${key}: ${valueOfSecondObj}\n`);
    }
  });
  diff.push('}');
  console.log(diff.join(''));
}
