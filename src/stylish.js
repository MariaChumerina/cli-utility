export default function formatToStr(tree) {
  function formatObj(obj, depth) {
    const countSpaces = depth * 4;
    const keyAndValues = Object.entries(obj);
    return keyAndValues.reduce((acc, [key, value]) => `{\n${' '.repeat(countSpaces)}${key}: ${value}\n${' '.repeat(countSpaces - 4)}}`, '');
  }

  const iter = (subTree, depth = 1) => {
    const formatted = subTree.flatMap((node) => {
      const {
        key, modified, beforeValue, afterValue, children,
      } = node;
      const tab = 4;
      const countSpaces = depth * tab;
      const formattedBeforeValue = typeof beforeValue === 'object' ? formatObj(beforeValue, depth + 1) : beforeValue;
      const formattedAfterValue = typeof afterValue === 'object' ? formatObj(afterValue, depth + 1) : afterValue;
      if (children) {
        const formattedChildren = iter(children, depth + 1);
        return `${' '.repeat(countSpaces)}${key}: ${formattedChildren}${' '.repeat(countSpaces)}}\n`;
      }
      switch (modified) {
        case 'unchanged':
          return `${' '.repeat(countSpaces)}${key}: ${formattedBeforeValue}\n`;
        case 'inserted':
          return `${' '.repeat(countSpaces - 2)}+ ${key}: ${formattedAfterValue}\n`;
        case 'deleted':
          return `${' '.repeat(countSpaces - 2)}- ${key}: ${formattedBeforeValue}\n`;
        case 'changed':
          return `${' '.repeat(countSpaces - 2)}- ${key}: ${formattedBeforeValue}\n${' '.repeat(countSpaces - 2)}+ ${key}: ${formattedAfterValue}\n`;
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
