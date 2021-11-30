#!/usr/bin/env node

/* eslint-disable no-console */
'use strict';

const fs = require('fs');

const { program } = require('commander');
program.version('0.0.1');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-f, --file <type>', 'path to ndjson file');

program.parse(process.argv);

const options = program.opts();
console.log('Reshape Details:');
if (options.debug) console.log(options);
if (options.file) console.log(`- file name: ${options.file}`);

const parse = (jsonString) => {
  const type = typeof jsonString;
  if (type !== 'string')
    throw new Error(`Input have to be string but got ${type}`);
  const jsonRows = jsonString.split(/\n|\n\r/).filter(Boolean);
  return jsonRows.map((jsonStringRow) => JSON.parse(jsonStringRow));
};
const file =
  '/Users/jesse/Downloads/stage-export-2021-11-18t17-16-10-946z/data.ndjson';

async function run() {
  const buffer = fs.readFileSync(file);
  const parsed = parse(buffer.toString()).filter((d) => {
    const now = new Date();
    return (
      d.author?._ref === 'e-6037ff5847033100712f6364-self' &&
      now.setDate(now.getDate() - 5) < new Date(d._createdAt)
    );
  });
  fs.writeFileSync(
    '/Users/jesse/Downloads/stage-export-2021-11-18t17-16-10-946z/dataFiltered.json',
    JSON.stringify(parsed),
  );
  console.log(parsed);
  console.log(parsed.length);
}

run();
