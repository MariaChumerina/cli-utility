import _ from 'lodash';
import parse from '../parsers.js';
import formatToStr from './stylish.js';

export default function buildTreeDiff(original, modified) {
  if (original.length < 1 || modified.length < 1) return 'Invalid file name';
  const firstObj = parse(original);
  const secondObj = parse(modified);

  const iter = (first, second) => {
    const keys = _.union(Object.keys(first), Object.keys(second));
    return keys.flatMap((key) => {
      const beforeValue = first[key];
      const afterValue = second[key];
      const hasSecondKey = _.has(second, key);
      const hasFirstKey = _.has(first, key);
      if (hasFirstKey && hasSecondKey) {
        if (typeof beforeValue === 'object' && typeof afterValue === 'object') {
          return [{
            modified: 'unchanged', key, beforeValue: 'object', children: [...iter(beforeValue, afterValue)],
          }];
        }
        if (beforeValue === afterValue) return [{ modified: 'unchanged', key, beforeValue }];
        if (beforeValue !== afterValue) {
          return [{
            modified: 'changed', key, beforeValue, afterValue,
          }];
        }
      } else if (hasFirstKey && !hasSecondKey) return [{ modified: 'deleted', key, beforeValue }];
      else if (!hasFirstKey && hasSecondKey) return [{ modified: 'inserted', key, afterValue }];
      return null;
    });
  };
  const diffTree = iter(firstObj, secondObj);
  console.log(formatToStr(diffTree));
  return formatToStr(diffTree);
}
