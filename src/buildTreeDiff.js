import _ from 'lodash';

export default function buildTreeDiff(originalObj, modifiedObj) {
  const iter = (first, second) => {
    const keys = _.union(Object.keys(first), Object.keys(second));
    return keys.flatMap((key) => {
      const beforeValue = first[key];
      const afterValue = second[key];
      const hasFirstKey = _.has(first, key);
      const hasSecondKey = _.has(second, key);
      let modified;
      if (hasFirstKey && hasSecondKey) {
        modified = _.isEqual(beforeValue, afterValue) ? 'unchanged' : 'changed';
      } else if (hasFirstKey && !hasSecondKey) modified = 'deleted';
      else if (!hasFirstKey && hasSecondKey) modified = 'inserted';
      return [{
        modified,
        key,
        beforeValue,
        afterValue,
        children: typeof beforeValue === 'object' && typeof afterValue === 'object'
          ? [...iter(beforeValue, afterValue)] : [],
      }];
    });
  };
  return iter(originalObj, modifiedObj);
}
