import fs from 'fs';
import path from 'path';

export default function readFile(filename) {
  return fs.readFileSync(path.resolve(process.cwd(), `${filename}`), 'utf-8');
}
