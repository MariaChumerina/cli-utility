import { describe, expect, test } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);
const extensions = ['.json', '.yaml', '.ini'];
const expectedStylishDiff = fs.readFileSync('__fixtures__/expectedStylishDiff', 'utf-8');
const expectedPlainDiff = fs.readFileSync('__fixtures__/expectedPlainDiff', 'utf-8');
const expectedJsonDiff = fs.readFileSync('__fixtures__/expectedJsonDiff', 'utf-8');

describe('findDiff', () => {
  test('should work', () => {
    extensions.forEach((extension) => {
      const filename1 = getFixturePath(`before${extension}`);
      const filename2 = getFixturePath(`after${extension}`);
      expect(genDiff(`${filename1}`, `${filename2}`)).toEqual(expectedStylishDiff);
      expect(genDiff(`${filename1}`, `${filename2}`, 'plain')).toEqual(expectedPlainDiff);
      expect(genDiff(`${filename1}`, `${filename2}`, 'json')).toEqual(expectedJsonDiff);
    });
  });
});
