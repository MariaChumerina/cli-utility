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

export default function formatPlain(tree) {
  const iter = (subtree, parent = null) => subtree.flatMap((node) => {
    const {
      key, modified, beforeValue, afterValue, children,
    } = node;
    const fullKey = parent ? `${parent}.${key}` : key;
    const formattedBeforeValue = formatValue(beforeValue);
    const formattedAfterValue = formatValue(afterValue);
    if (children.length > 0 && modified === 'changed') {
      return iter(children, fullKey);
    }
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
  });
  return iter(tree).join('\n');
}
