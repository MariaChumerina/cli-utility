import path from 'path';
import fs from 'fs';
import buildTreeDiff from './buildTreeDiff.js';
import parse from './parsers.js';
import formatTree from './formatters/formatter.js';

function readFile(filename) {
  const absolutePath = path.resolve(process.cwd(), `${filename}`);
  return fs.readFileSync(absolutePath, 'utf-8');
}

function getFormatFile(filename) {
  return path.extname(filename).slice(1);
}

export default function genDiff(filename1, filename2, format = 'stylish') {
  const firstData = parse(readFile(filename1), getFormatFile(filename1));
  const secondData = parse(readFile(filename2), getFormatFile(filename2));

  const diffTree = buildTreeDiff(firstData, secondData);
  return formatTree(diffTree, format);
}
