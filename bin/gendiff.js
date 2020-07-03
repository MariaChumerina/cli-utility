#!/usr/bin/env node

import commander from 'commander';
import genDifference from '../index.js';

const { program } = commander;
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath1>')
  .option('-f, --format [type]', 'output format', 'Default format')
  .action((filepath1, filepath2) => {
    const diff = genDifference(filepath1, filepath2, program.format);
    console.log(diff);
  })
  .parse(process.argv);
