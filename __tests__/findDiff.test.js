import { expect, test } from '@jest/globals';
import path from 'path';
import findDiff from '../src/findDiff.js';

const filePath1 = path.resolve('__tests__', 'fixtures', 'file1.json');
const filePath2 = path.resolve('__tests__', 'fixtures', 'file2.json');

test('findDiff', () => {
  expect(findDiff(`${filePath1}`, `${filePath2}`)).toEqual('{\n'
      + '    host: hexlet.io\n'
      + '  + timeout: 20\n'
      + '  - timeout: 50\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - follow: false\n'
      + '  + verbose: true\n'
      + '}');
});
