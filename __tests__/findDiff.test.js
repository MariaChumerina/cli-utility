import { describe, expect, test } from '@jest/globals';
import path from 'path';
import buildTreeDiff from '../src/buildTreeDiff.js';
import getDiff from '../__fixtures__/epectedDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];
const [beforeIni, afterIni] = [getFixturePath('before.ini'), getFixturePath('after.ini')];

const expectedDiff = getDiff();
describe('findDiff', () => {
  test('should work ok', () => {
    expect(buildTreeDiff(`${beforeJson}`, `${afterJson}`)).toEqual(expectedDiff);
    expect(buildTreeDiff(`${beforeYaml}`, `${afterYaml}`)).toEqual(expectedDiff);
    expect(buildTreeDiff(`${beforeIni}`, `${afterIni}`)).toEqual(expectedDiff);
  });
});
