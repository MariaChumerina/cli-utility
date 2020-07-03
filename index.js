import buildTreeDiff from './src/buildTreeDiff.js';
import formatToStr from './src/stylish.js';
import parse from './parsers.js';

export default function genDifference(filePath1, filePath2, format = 'Default format') {
  const firstObj = parse(filePath1);
  const secondObj = parse(filePath2);

  let diffTree;
  switch (format) {
    case 'Default format':
      diffTree = buildTreeDiff(firstObj, secondObj);
      break;
    default:
      console.log(`Unknown format ${format}`);
      break;
  }

  return formatToStr(diffTree);
}
