import yaml from 'js-yaml';
import ini from 'ini';

export default function parse(fileContents, extname) {
  switch (extname) {
    case 'json':
      return JSON.parse(fileContents);
    case 'yaml':
      return yaml.safeLoad(fileContents);
    case 'ini':
      return ini.parse(fileContents);
    default: throw new Error('Unknown format');
  }
}
