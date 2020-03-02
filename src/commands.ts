#!/usr/bin/env node
const program = require('commander');
import {getTop} from "./index";

program 
  .version('1.0.0')
  .description('deezer search cli')

program
  .command('find ...name')
  .description('Find by name')
  .action((name: any) => getTop(name.parent.args));

program.parse(process.argv);