import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const getExpectedDiff = (format) => fs.readFileSync(`__fixtures__/expected${format}.txt`, 'utf-8');
const extensions = ['.json', '.yaml', '.ini'];

describe('findDiff', () => {
  test('should work', () => {
    extensions.forEach((extension) => {
      const filename1 = getFixturePath(`before${extension}`);
      const filename2 = getFixturePath(`after${extension}`);
      expect(genDiff(`${filename1}`, `${filename2}`)).toEqual(getExpectedDiff('Stylish'));
      expect(genDiff(`${filename1}`, `${filename2}`, 'plain')).toEqual(getExpectedDiff('Plain'));
      expect(genDiff(`${filename1}`, `${filename2}`, 'json')).toEqual(getExpectedDiff('Json'));
    });
  });
});
