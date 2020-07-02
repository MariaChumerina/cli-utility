import { describe, expect, test } from '@jest/globals';
import path from 'path';
import findDiff from '../src/findDiff.js';
import { expectedDiff } from '../__fixtures__/epectedDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];
const [beforeIni, afterIni] = [getFixturePath('before.ini'), getFixturePath('after.ini')];

describe('findDiff', () => {
  test('should work ok', () => {
    expect(findDiff(`${beforeJson}`, `${afterJson}`)).toEqual(expectedDiff);
    expect(findDiff(`${beforeYaml}`, `${afterYaml}`)).toEqual(expectedDiff);
    expect(findDiff(`${beforeIni}`, `${afterIni}`)).toEqual(expectedDiff);
  });
});
