import _ from 'lodash';
import parse from '../parsers.js';
import formatToStr from './stylish.js';

export default function buildDiff(original, modified) {
  if (original.length < 1 || modified.length < 1) return 'Invalid file name';
  const firstObj = parse(original);
  const secondObj = parse(modified);

  const iter = (first, second) => {
    const keys = _.union(Object.keys(first), Object.keys(second));
    return keys.flatMap((key) => {
      const beforeValue = first[key];
      const comparedValue = second[key];
      const typeValue = typeof beforeValue;
      const typeComparedValue = typeof comparedValue;
      const hasSecondKey = _.has(second, key);
      const hasFirstKey = _.has(first, key);
      if (hasFirstKey) {
        switch (hasSecondKey) {
          case true:
            if (typeValue === 'object' && typeComparedValue === 'object') {
              return [{
                modified: 'unchanged', key, beforeValue: 'object', children: [...iter(beforeValue, comparedValue)],
              }];
            } if (beforeValue === comparedValue) {
              return [{ modified: 'unchanged', key, beforeValue }];
            } if (beforeValue !== comparedValue) {
              return [{
                modified: 'changed', key, beforeValue, afterValue: comparedValue,
              }];
            }
            break;
          case false:
            return [{ modified: 'deleted', key, beforeValue }];
          default:
            throw new Error('Whaaaaaaaaaaaat?!');
        }
      } else {
        return [{ modified: 'inserted', key, afterValue: comparedValue }];
      }
    });
  };
  const diffTree = iter(firstObj, secondObj);

  console.log(formatToStr(diffTree));
  return formatToStr(diffTree);
}
