import { expect, test } from '@jest/globals';
import path from 'path';
import findDiff from '../src/findDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');

const expectedDiff = '{\n'
    + '    host: hexlet.io\n'
    + '  + timeout: 20\n'
    + '  - timeout: 50\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - follow: false\n'
    + '  + verbose: true\n'
    + '}';

test('findDiff', () => {
  expect(findDiff(`${filePath1}`, `${filePath2}`)).toEqual(expectedDiff);
});
