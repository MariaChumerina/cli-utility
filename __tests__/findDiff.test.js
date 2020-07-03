import { describe, expect, test } from '@jest/globals';
import path from 'path';
import buildDiff from '../src/buildDiff.js';
import getExpectedDiff from '../__fixtures__/epectedDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];
const [beforeIni, afterIni] = [getFixturePath('before.ini'), getFixturePath('after.ini')];

const expectedDiff = getExpectedDiff();
describe('findDiff', () => {
  test('should work ok', () => {
    expect(buildDiff(`${beforeJson}`, `${afterJson}`)).toEqual(expectedDiff);
    expect(buildDiff(`${beforeYaml}`, `${afterYaml}`)).toEqual(expectedDiff);
    expect(buildDiff(`${beforeIni}`, `${afterIni}`)).toEqual(expectedDiff);
  });
});
