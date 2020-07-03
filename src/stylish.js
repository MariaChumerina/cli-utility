
function formatObj(obj, depth) {
  const countSpaces = depth * 4;
  const keyAndValues = Object.entries(obj);
  return  keyAndValues.reduce((acc, [key, value]) => {
    return `{\n${' '.repeat(countSpaces)}${key}: ${value}\n${' '.repeat(countSpaces - 4)}}`;
  }, '');
}

export default function formatToStr(tree) {
  const iter = (subTree, depth = 1) => {
    const formatted = subTree.flatMap((node) => {
      const { key, value, modified } = node;
      const tab = 4;
      const countSpaces = depth * tab;
      if (node.children) {
        const formattedChildren = iter(node.children, depth + 1);
        return `${' '.repeat(countSpaces)}${key}: ${formattedChildren}${' '.repeat(countSpaces)}}\n`;
      }
      if (modified === 'unchanged') {
        const modValue = typeof value === 'object' ? formatObj(value, depth + 1) : value;
        return `${' '.repeat(countSpaces)}${key}: ${modValue}\n`;
      }
      else if (modified === 'inserted') {
        const modValue = typeof value === 'object' ? formatObj(value, depth + 1) : value;
        return `${' '.repeat(countSpaces - 2)}+ ${key}: ${modValue}\n`;
      }
      else if (modified === 'deleted') {
        const countSpaces = depth * tab - 2;
        const modValue = typeof value === 'object' ? formatObj(value, depth + 1) : value;
        return `${' '.repeat(countSpaces)}- ${key}: ${modValue}\n`;
      }
      else if (modified === 'changed') {
        const { beforeValue, afterValue } = node;
        const modBeforeValue = typeof beforeValue === 'object' ? formatObj(beforeValue, depth + 1) : beforeValue;
        const modAfterValue = typeof afterValue === 'object' ? formatObj(afterValue, depth + 1) : afterValue;
        return `${' '.repeat(countSpaces - 2)}- ${key}: ${modBeforeValue}\n${' '.repeat(countSpaces - 2)}+ ${key}: ${modAfterValue}\n`;
      }
    });
    const begin = '{\n';
    const result = [begin, ...formatted];
    return result.join('');
  }
  const formatted = iter(tree);
  const end = '}';

  return formatted.concat(end);
}