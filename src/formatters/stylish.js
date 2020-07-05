export default function formatStylish(tree) {
  const tab = 4;

  function formatObj(obj, depth) {
    const spaces = ' '.repeat(depth * tab);
    const shortSpaces = ' '.repeat(depth * tab - tab);
    return Object.entries(obj).reduce((acc, [key, value]) => `{\n${spaces}${key}: `
      + `${value}\n${shortSpaces}}`, '');
  }

  const iter = (subTree, depth = 1) => {
    const formatted = subTree.flatMap(({
      key, modified, beforeValue, afterValue, children,
    }) => {
      const spaces = ' '.repeat(depth * tab);
      const shortSpaces = ' '.repeat(depth * tab - tab / 2);
      const formattedBeforeValue = typeof beforeValue === 'object' ? formatObj(beforeValue, depth + 1) : beforeValue;
      const formattedAfterValue = typeof afterValue === 'object' ? formatObj(afterValue, depth + 1) : afterValue;
      if (children.length > 0) {
        const formattedChildren = iter(children, depth + 1);
        return `${spaces}${key}: ${formattedChildren}${spaces}}\n`;
      }
      switch (modified) {
        case 'unchanged':
          return `${spaces}${key}: ${formattedBeforeValue}\n`;
        case 'inserted':
          return `${shortSpaces}+ ${key}: ${formattedAfterValue}\n`;
        case 'deleted':
          return `${shortSpaces}- ${key}: ${formattedBeforeValue}\n`;
        case 'changed':
          return `${shortSpaces}- ${key}: ${formattedBeforeValue}\n${shortSpaces}+ ${key}: ${formattedAfterValue}\n`;
        default: throw new Error('error');
      }
    });
    const begin = '{\n';
    const result = [begin, ...formatted];
    return result.join('');
  };
  const formatted = iter(tree);
  const end = '}';

  return formatted.concat(end);
}
