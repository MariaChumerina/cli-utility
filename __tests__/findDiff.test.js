import { describe, expect, test } from '@jest/globals';
import path from 'path';
import genDifference from '../index.js';
import getDiff from '../__fixtures__/epectedStylishDiff.js';
import getPlainDiff from '../__fixtures__/expectedPlainDiff.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];
const [beforeIni, afterIni] = [getFixturePath('before.ini'), getFixturePath('after.ini')];

const expectedStylishDiff = getDiff();
const expectedPlainDiff = getPlainDiff();
describe('findDiff', () => {
  test('should be a stylish format', () => {
    expect(genDifference(`${beforeJson}`, `${afterJson}`)).toEqual(expectedStylishDiff);
    expect(genDifference(`${beforeYaml}`, `${afterYaml}`)).toEqual(expectedStylishDiff);
    expect(genDifference(`${beforeIni}`, `${afterIni}`)).toEqual(expectedStylishDiff);
  });
  test('should be a plain format', () => {
    expect(genDifference(`${beforeJson}`, `${afterJson}`, 'plain')).toEqual(expectedPlainDiff);
    expect(genDifference(`${beforeYaml}`, `${afterYaml}`, 'plain')).toEqual(expectedPlainDiff);
    expect(genDifference(`${beforeIni}`, `${afterIni}`, 'plain')).toEqual(expectedPlainDiff);
  });
});
