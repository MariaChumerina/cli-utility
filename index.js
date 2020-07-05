import buildTreeDiff from './src/buildTreeDiff.js';
import parse from './parsers.js';
import formatStylish from './src/formatters/stylish.js';
import formatPlain from './src/formatters/plain.js';
import formatJson from './src/formatters/json.js';

export default function genDifference(filePath1, filePath2, format = 'default') {
  if (!filePath1 || !filePath2) return 'Invalid file name';

  const firstObj = parse(filePath1);
  const secondObj = parse(filePath2);

  const diffTree = buildTreeDiff(firstObj, secondObj);
  switch (format) {
    case 'default':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return formatJson(diffTree);
    default:
      return `Unknown format ${format}`;
  }
}
