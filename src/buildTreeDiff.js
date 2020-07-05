import _ from 'lodash';

export default function buildTreeDiff(original, modified) {
  if (original.length < 1 || modified.length < 1) return 'Invalid file name';
  const iter = (first, second) => {
    const keys = _.union(Object.keys(first), Object.keys(second));
    return keys.flatMap((key) => {
      const beforeValue = first[key];
      const afterValue = second[key];
      const hasSecondKey = _.has(second, key);
      const hasFirstKey = _.has(first, key);
      let diff;
      if (hasFirstKey && hasSecondKey) {
        if (typeof beforeValue === 'object' && typeof afterValue === 'object' && _.isEqual(beforeValue, afterValue)) {
          diff = [{
            modified: 'unchanged', key, beforeValue, children: [...iter(beforeValue, afterValue)],
          }];
        } else if (typeof beforeValue === 'object' && typeof afterValue === 'object') {
          diff = [{
            modified: 'changed', key, beforeValue, afterValue, children: [...iter(beforeValue, afterValue)],
          }];
        } else if (beforeValue === afterValue) return [{ modified: 'unchanged', key, beforeValue }];
        else if (beforeValue !== afterValue) {
          diff = [{
            modified: 'changed', key, beforeValue, afterValue,
          }];
        }
      } else if (hasFirstKey && !hasSecondKey) diff = [{ modified: 'deleted', key, beforeValue }];
      else if (!hasFirstKey && hasSecondKey) diff = [{ modified: 'inserted', key, afterValue }];
      return diff;
    });
  };
  return iter(original, modified);
}
