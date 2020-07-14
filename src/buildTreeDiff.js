import _ from 'lodash';

export default function buildTreeDiff(originalObj, modifiedObj) {
  const keys = _.union(Object.keys(originalObj), Object.keys(modifiedObj));
  return keys.flatMap((key) => {
    const hasFirstKey = _.has(originalObj, key);
    const hasSecondKey = _.has(modifiedObj, key);
    if (hasFirstKey && !hasSecondKey) {
      return [{ status: 'deleted', key, beforeValue: originalObj[key] }];
    } if (!hasFirstKey && hasSecondKey) {
      return [{ status: 'inserted', key, afterValue: modifiedObj[key] }];
    }
    if (_.isObject(originalObj[key]) && _.isObject(modifiedObj[key])) {
      return [{
        isObject: true, key, children: [...buildTreeDiff(originalObj[key], modifiedObj[key])],
      }];
    }
    if (!_.isEqual(originalObj[key], modifiedObj[key])) {
      return [{
        status: 'changed', key, beforeValue: originalObj[key], afterValue: modifiedObj[key],
      }];
    }
    return [{ status: 'unchanged', key, beforeValue: originalObj[key] }];
  });
}
