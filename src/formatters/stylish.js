const tabLength = 4;

function formatObj(obj, depth) {
  const spaces = ' '.repeat(depth * tabLength - tabLength);
  return Object.entries(obj).reduce((acc, [key, value]) => `{\n${spaces}    ${key}: `
      + `${value}\n${spaces}}`, '');
}

function formatTree(subTree, depth = 1) {
  const formatted = subTree.flatMap(({
    key, modified, beforeValue, afterValue, children,
  }) => {
    const spaces = ' '.repeat(depth * tabLength - tabLength / 2);
    const formattedBeforeValue = typeof beforeValue === 'object' ? formatObj(beforeValue, depth + 1) : beforeValue;
    const formattedAfterValue = typeof afterValue === 'object' ? formatObj(afterValue, depth + 1) : afterValue;
    if (children.length > 0) {
      const formattedChildren = formatTree(children, depth + 1);
      return `${spaces}  ${key}: ${formattedChildren}${spaces}  }\n`;
    }
    switch (modified) {
      case 'unchanged':
        return `${spaces}  ${key}: ${formattedBeforeValue}\n`;
      case 'inserted':
        return `${spaces}+ ${key}: ${formattedAfterValue}\n`;
      case 'deleted':
        return `${spaces}- ${key}: ${formattedBeforeValue}\n`;
      case 'changed':
        return `${spaces}- ${key}: ${formattedBeforeValue}\n${spaces}+ ${key}: ${formattedAfterValue}\n`;
      default: throw new Error('error');
    }
  });
  const begin = '{\n';
  const result = [begin, ...formatted];
  return result.join('');
}

export default function formatStylish(tree) {
  const formatted = formatTree(tree);
  return formatted.concat('}');
}
