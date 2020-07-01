import _ from 'lodash';
import parse from '../parsers.js';

export default function findDiff(filePath1, filePath2) {
  const firstObj = parse(filePath1);
  const secondObj = parse(filePath2);

  const firstObjKeys = Object.keys(firstObj);
  const secondObjKeys = Object.keys(secondObj);

  const diff = ['{'];
  firstObjKeys.forEach((key) => {
    const valueOfFirstObj = firstObj[key];
    const valueOfSecondObj = secondObj[key];
    const hasObjKey = _.has(secondObj, key);
    switch (hasObjKey) {
      case true:
        if (valueOfSecondObj === valueOfFirstObj) diff.push(`    ${key}: ${valueOfFirstObj}`);
        else {
          diff.push(`  + ${key}: ${valueOfSecondObj}`);
          diff.push(`  - ${key}: ${valueOfFirstObj}`);
        }
        break;
      case false:
        diff.push(`  - ${key}: ${valueOfFirstObj}`);
        break;
      default: throw new Error('Something went wrong');
    }
  });

  secondObjKeys.forEach((key) => {
    const valueOfSecondObj = secondObj[key];
    if (!_.has(firstObj, key)) {
      diff.push(`  + ${key}: ${valueOfSecondObj}`);
    }
  });
  diff.push('}');
  console.log(diff.join('\n'));
  return diff.join('\n');
}
