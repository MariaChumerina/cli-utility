export default function getExpectedDiff() {
  return '{\n'
      + '    host: hexlet.io\n'
      + '  + timeout: 20\n'
      + '  - timeout: 50\n'
      + '  - proxy: 123.234.53.22\n'
      + '  - follow: false\n'
      + '  + verbose: true\n'
      + '}';
}
