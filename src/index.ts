#!/usr/bin/env node

import { Command } from 'commander';
const figlet = require('figlet');

const program = new Command();

console.log(figlet.textSync('Rocket Start'));

program.name('mycli').description('My CLI').version('0.0.1');

program.argument('<string>', 'Name of the user').action((message: string) => {
  console.log(`Hello, ${message}!`);
});

program.parse(process.argv);
