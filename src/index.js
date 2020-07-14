import path from 'path';
import buildTreeDiff from './buildTreeDiff.js';
import parse from './parsers.js';
import formatTree from './formatters/formatter.js';
import { getPath, readFile } from './utils.js';

export default function genDiff(filename1, filename2, format = 'stylish') {
  const filePath1 = getPath(filename1);
  const filePath2 = getPath(filename2);

  const contentOfFirst = readFile(filePath1);
  const contentOfSecond = readFile(filePath2);

  const firstObj = parse(contentOfFirst, path.extname(filename1));
  const secondObj = parse(contentOfSecond, path.extname(filename1));

  const diffTree = buildTreeDiff(firstObj, secondObj);
  return formatTree(diffTree, format);
}
