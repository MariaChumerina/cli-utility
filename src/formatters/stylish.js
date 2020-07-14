const tabLength = 4;

function formatObj(obj, depth) {
  const spaces = ' '.repeat(depth * tabLength - tabLength);
  return Object.entries(obj).reduce((acc, [key, value]) => `{\n${spaces}    ${key}: `
      + `${value}\n${spaces}}`, '');
}

function formatStr(node, spaces, depth) {
  const {
    key, status, beforeValue, afterValue,
  } = node;
  const formattedBeforeValue = typeof beforeValue === 'object' ? formatObj(beforeValue, depth + 1) : beforeValue;
  const formattedAfterValue = typeof afterValue === 'object' ? formatObj(afterValue, depth + 1) : afterValue;
  switch (status) {
    case 'unchanged':
      return `${spaces}  ${key}: ${formattedBeforeValue}\n`;
    case 'inserted':
      return `${spaces}+ ${key}: ${formattedAfterValue}\n`;
    case 'deleted':
      return `${spaces}- ${key}: ${formattedBeforeValue}\n`;
    case 'changed':
      return `${spaces}- ${key}: ${formattedBeforeValue}\n${spaces}+ ${key}: ${formattedAfterValue}\n`;
    default: throw new Error('Unknown modified type');
  }
}

function formatTree(subTree, depth = 1) {
  const formatted = subTree.flatMap((node) => {
    const { key, isObject, children } = node;
    const spaces = ' '.repeat(depth * tabLength - tabLength / 2);
    if (isObject) {
      const formattedChildren = formatTree(children, depth + 1);
      return `${spaces}  ${key}: ${formattedChildren}${spaces}  }\n`;
    }
    return formatStr(node, spaces, depth);
  });
  const begin = '{\n';
  const result = [begin, ...formatted];
  return result.join('');
}

export default function formatStylish(tree) {
  const formatted = formatTree(tree);
  return formatted.concat('}');
}
