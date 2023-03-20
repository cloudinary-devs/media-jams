#!/usr/bin/env node

/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const { readFile, writeFile } = require('fs').promises;

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

async function parseJSONFile(fileName) {
  try {
    const file = await readFile(fileName);
    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}
const file = 'posts_2023.01.24-12.50.18.json';

async function run() {
  const data = await parseJSONFile(file);
  console.log(data);
  data.forEach(async ({ content, url_title, title }) => {
    try {
      console.log(url_title, title);
      await writeFile(`_markdown/${url_title}.md`, String(content));
      console.log(`Successfully converted ${title}!`);
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });
}

run();
