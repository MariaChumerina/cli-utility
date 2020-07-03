import _ from 'lodash';
import parse from '../parsers.js';
import formatToStr from './stylish.js';

export default function buildDiff(original, modified) {
  if (original.length < 1 || modified.length < 1) return 'Invalid file name';
  const firstObj = parse(original);
  const secondObj = parse(modified);

  const iter = (first, second) => {
    const keys = _.union(Object.keys(first), Object.keys(second));
    return keys.flatMap(( key) => {
      const value = first[key];
      const comparedValue = second[key];
      const typeValue = typeof value;
      const typeComparedValue = typeof comparedValue;
      const hasSecondKey = _.has(second, key);
      const hasFirstKey = _.has(first, key);
      if (hasFirstKey) {
        switch (hasSecondKey) {
          case true:
            if (typeValue === 'object' && typeComparedValue === 'object') {
              return [{modified: 'unchanged', key: key, value: 'object', children: [...iter(value, comparedValue)]}];
            } else if (typeValue === 'object' || typeComparedValue === 'object') {
              return [{modified: 'changed', key: key, beforeValue: value, afterValue: comparedValue}];
            } else if (value === comparedValue) {
              return [{modified: 'unchanged', key: key, value: value}];
            } else if (value !== comparedValue) {
              return [{modified: 'changed', key: key, beforeValue: value, afterValue: comparedValue}];
            }
            break;
          case false:
            return [{modified: 'deleted', key: key, value: value}];
          default:
            throw new Error('Whaaaaaaaaaaaat?!');
        }
      } else {
        return [{modified: 'inserted', key: key, value: comparedValue}];
      }
    });
  }
  const diffTree = iter(firstObj, secondObj);

  // fs.writeFileSync('result.js', JSON.stringify(diffTree)
  //     , 'utf-8' );
  console.log(formatToStr(diffTree));
  return formatToStr(diffTree);
}

