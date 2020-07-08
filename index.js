import path from 'path';
import buildTreeDiff from './src/buildTreeDiff.js';
import parse from './parsers.js';
import formatStylish from './src/formatters/stylish.js';
import formatPlain from './src/formatters/plain.js';
import formatJson from './src/formatters/json.js';
import readFile from './utils.js';

export default function genDiff(filePath1, filePath2, format = 'default') {
  const contentOfFirst = readFile(filePath1);
  const contentOfSecond = readFile(filePath2);

  const firstObj = parse(contentOfFirst, path.extname(filePath1));
  const secondObj = parse(contentOfSecond, path.extname(filePath1));

  const diffTree = buildTreeDiff(firstObj, secondObj);
  switch (format) {
    case 'stylish':
      return formatStylish(diffTree);
    case 'plain':
      return formatPlain(diffTree);
    case 'json':
      return formatJson(diffTree);
    default:
      return formatStylish(diffTree);
  }
}
