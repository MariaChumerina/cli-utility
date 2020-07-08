import _ from 'lodash';

export default function buildTreeDiff(originalObj, modifiedObj) {
  const keys = _.union(Object.keys(originalObj), Object.keys(modifiedObj));
  return keys.flatMap((key) => {
    const beforeValue = originalObj[key];
    const afterValue = modifiedObj[key];
    const hasFirstKey = _.has(originalObj, key);
    const hasSecondKey = _.has(modifiedObj, key);
    if (hasFirstKey && hasSecondKey) {
      const modified = _.isEqual(beforeValue, afterValue) ? 'unchanged' : 'changed';
      const children = _.isObject(beforeValue) && _.isObject(afterValue)
        ? [...buildTreeDiff(beforeValue, afterValue)] : [];
      return [{
        modified, key, beforeValue, afterValue, children,
      }];
    } if (hasFirstKey && !hasSecondKey) {
      return [{
        modified: 'deleted', key, beforeValue, afterValue, children: [],
      }];
    } if (!hasFirstKey && hasSecondKey) {
      return [{
        modified: 'inserted', key, beforeValue, afterValue, children: [],
      }];
    }
    return [];
  });
}
