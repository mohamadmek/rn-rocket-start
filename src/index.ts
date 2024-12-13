#!/usr/bin/env node

import { Command } from 'commander';
import { copyDirectoryAndChangeName } from './helpers/boilerplateHelpers';
const figlet = require('figlet');
import path from 'path';

const boilerplatePath = path.resolve(__dirname, '../boilerplate');
const program = new Command();

console.log(figlet.textSync('Rocket Start'));

program.name('mycli').description('My CLI').version('0.0.5');

program
  .argument('<string>', 'Name of the project')
  .action(async (name: string) => {
    await copyDirectoryAndChangeName(boilerplatePath, name);
  });

program.parse(process.argv);
