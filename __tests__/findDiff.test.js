import { expect, test } from '@jest/globals';
import path from 'path';
import findDiff from '../src/findDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];

const expectedDiff = '{\n'
    + '    host: hexlet.io\n'
    + '  + timeout: 20\n'
    + '  - timeout: 50\n'
    + '  - proxy: 123.234.53.22\n'
    + '  - follow: false\n'
    + '  + verbose: true\n'
    + '}';

test('findDiff', () => {
  expect(findDiff(`${beforeJson}`, `${afterJson}`)).toEqual(expectedDiff);
  expect(findDiff(`${beforeYaml}`, `${afterYaml}`)).toEqual(expectedDiff);
});
