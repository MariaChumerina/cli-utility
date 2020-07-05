import { describe, expect, test } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDifference from '../index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const [beforeJson, afterJson] = [getFixturePath('before.json'), getFixturePath('after.json')];
const [beforeYaml, afterYaml] = [getFixturePath('before.yaml'), getFixturePath('after.yaml')];
const [beforeIni, afterIni] = [getFixturePath('before.ini'), getFixturePath('after.ini')];

const expectedStylishDiff = fs.readFileSync('__fixtures__/expectedStylishDiff', 'utf-8');
const expectedPlainDiff = fs.readFileSync('__fixtures__/expectedPlainDiff', 'utf-8');
const expectedJsonDiff = fs.readFileSync('__fixtures__/expectedJsonDiff.json', 'utf-8');

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
  test('should be a json format', () => {
    expect(genDifference(`${beforeJson}`, `${afterJson}`, 'json')).toEqual(expectedJsonDiff);
    expect(genDifference(`${beforeYaml}`, `${afterYaml}`, 'json')).toEqual(expectedJsonDiff);
    expect(genDifference(`${beforeIni}`, `${afterIni}`, 'json')).toEqual(expectedJsonDiff);
  });
});
