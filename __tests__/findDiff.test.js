import { describe, expect, test } from '@jest/globals';
import path from 'path';
import genDifference from '../index.js';
import getDiff from '../__fixtures__/epectedDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];
const [beforeIni, afterIni] = [getFixturePath('before.ini'), getFixturePath('after.ini')];

const expectedDiff = getDiff();
describe('findDiff', () => {
  test('should work ok', () => {
    expect(genDifference(`${beforeJson}`, `${afterJson}`)).toEqual(expectedDiff);
    expect(genDifference(`${beforeYaml}`, `${afterYaml}`)).toEqual(expectedDiff);
    expect(genDifference(`${beforeIni}`, `${afterIni}`)).toEqual(expectedDiff);
  });
});
