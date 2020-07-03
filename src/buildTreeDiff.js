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
      if (hasFirstKey && hasSecondKey) {
        if (typeof beforeValue === 'object' && typeof afterValue === 'object') {
          return [{
            modified: 'unchanged', key, beforeValue, children: [...iter(beforeValue, afterValue)],
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
  return iter(original, modified);
}
