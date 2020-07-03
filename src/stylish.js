export default function formatToStr(tree) {
  function formatObj(obj, depth) {
    const countOfSpaces = depth * 4;
    const spaces = ' '.repeat(countOfSpaces);
    const shortSpaces = ' '.repeat(countOfSpaces - 4);
    const keyAndValues = Object.entries(obj);
    return keyAndValues.reduce((acc, [key, value]) => `{\n${spaces}${key}: ${value}\n${shortSpaces}}`, '');
  }

  const iter = (subTree, depth = 1) => {
    const formatted = subTree.flatMap((node) => {
      const {
        key, modified, beforeValue, afterValue, children,
      } = node;
      const tab = 4;
      const countOfSpaces = depth * tab;
      const spaces = ' '.repeat(countOfSpaces);
      const shortSpaces = ' '.repeat(countOfSpaces - 2);
      const formattedBeforeValue = typeof beforeValue === 'object' ? formatObj(beforeValue, depth + 1) : beforeValue;
      const formattedAfterValue = typeof afterValue === 'object' ? formatObj(afterValue, depth + 1) : afterValue;
      if (children) {
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
