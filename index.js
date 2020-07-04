import buildTreeDiff from './src/buildTreeDiff.js';
import formatStylish from './src/formatters/stylish.js';
import parse from './parsers.js';
import formatPlain from './src/formatters/plain.js';

export default function genDifference(filePath1, filePath2, format = 'default') {
  const firstObj = parse(filePath1);
  const secondObj = parse(filePath2);

  const diffTree = buildTreeDiff(firstObj, secondObj);
  switch (format) {
    case 'default':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    default:
      return `Unknown format ${format}`;
  }
}
