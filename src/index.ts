#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program.name("mycli").description("My CLI").version("0.0.1");

program.argument("<string>", "Name of the user").action((message: string) => {
  console.log(`Hello, ${message}!`);
});

program.parse(process.argv);
