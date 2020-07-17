import has from 'lodash/has.js';
import union from 'lodash/union.js';
import isObject from 'lodash/isObject.js';
import isEqual from 'lodash/isEqual.js';

export default function buildTreeDiff(originalObj, modifiedObj) {
  const keys = union(Object.keys(originalObj), Object.keys(modifiedObj));
  return keys.flatMap((key) => {
    if (has(originalObj, key) && !has(modifiedObj, key)) {
      return [{ status: 'deleted', key, beforeValue: originalObj[key] }];
    }
    if (!has(originalObj, key) && has(modifiedObj, key)) {
      return [{ status: 'inserted', key, afterValue: modifiedObj[key] }];
    }
    if (isObject(originalObj[key]) && isObject(modifiedObj[key])) {
      return [{
        status: 'object', key, children: [...buildTreeDiff(originalObj[key], modifiedObj[key])],
      }];
    }
    if (!isEqual(originalObj[key], modifiedObj[key])) {
      return [{
        status: 'changed', key, beforeValue: originalObj[key], afterValue: modifiedObj[key],
      }];
    }
    return [{ status: 'unchanged', key, beforeValue: originalObj[key] }];
  });
}
