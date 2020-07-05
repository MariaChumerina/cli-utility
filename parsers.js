import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

function fix(file) {

}
export default function parse(filename) {
  const format = path.extname(filename);
  const readingFile = fs.readFileSync(path.resolve(process.cwd(), `${filename}`), 'utf-8');

  let result;
  switch (format) {
    case '.json':
      result = JSON.parse(readingFile);
      break;
    case '.yaml':
      result = yaml.safeLoad(readingFile);
      break;
    case '.ini':
      result = ini.parse(readingFile);
      fix(result);
      break;
    default: throw new Error('Unknown format');
  }

  return result;
}
