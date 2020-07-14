import fs from 'fs';
import path from 'path';

export function getPath(filename) {
  return path.resolve(process.cwd(), `${filename}`);
}

export function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}
