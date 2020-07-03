import commander from 'commander';
import buildTreeDiff from './src/buildTreeDiff.js';

export default function genDiff() {
  const { program } = commander;
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1')
    .arguments('<filepath1> <filepath1>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      buildTreeDiff(filepath1, filepath2);
    })
    .parse(process.argv);
}
