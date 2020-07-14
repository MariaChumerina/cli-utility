import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

export default function formatTree(diffTree, format) {
  switch (format) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return formatJson(diffTree);
    default: throw new Error('Unknown format');
  }
}
