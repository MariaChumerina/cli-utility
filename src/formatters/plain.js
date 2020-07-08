function formatValue(value) {
  const type = typeof value;
  switch (type) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
}

function formatStr(node, fullKey) {
  const { modified, beforeValue, afterValue } = node;
  const formattedBeforeValue = formatValue(beforeValue);
  const formattedAfterValue = formatValue(afterValue);

  switch (modified) {
    case 'changed':
      return `Property '${fullKey}' was updated. From ${formattedBeforeValue} to ${formattedAfterValue}`;
    case 'deleted':
      return `Property '${fullKey}' was removed`;
    case 'inserted':
      return `Property '${fullKey}' was added with value: ${formattedAfterValue}`;
    case 'unchanged':
      return [];
    default: throw new Error('Unknown property');
  }
}

export default function formatPlain(tree, parent = null) {
  const formattedTree = tree.flatMap((node) => {
    const { key, children } = node;
    const fullKey = parent ? `${parent}.${key}` : key;
    return children.length > 0 ? formatPlain(children, fullKey) : formatStr(node, fullKey);
  });
  return formattedTree.join('\n');
}
