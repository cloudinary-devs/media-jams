#!/usr/bin/env node

/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const createClient = require('@sanity/client');
const reduce = require('json-reduce').default;
const inquirer = require('inquirer');
const ConfigStore = require('configstore');
const fetchAllDocuments = require('./fetchAllDocuments');

let sanityConfig;
try {
  sanityConfig = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'sanity.json')).toString(),
  );
} catch (error) {
  console.error(
    'Could not read sanity config from current working directory. Make sure you have a sanity.json.\nError was %s',
    error.message,
  );
  process.exit(1);
}
const datasetIndex = process.argv.indexOf('--dataset') + 1;
const dataset = datasetIndex && process.argv[datasetIndex];
const targetDataset = dataset ? dataset : sanityConfig.api.dataset;

function promptBackup() {
  return inquirer.prompt([
    {
      name: 'continue',
      type: 'confirm',
      default: false,
      message: `Updating refs to weak.\n\nBefore doing this migration, make sure you have a backup handy.\n  "sanity dataset export <dataset> <somefile.ndjson>" is an easy way to do this.\n\nWould you like to perform the "tag => _ref tag weak"-migration on dataset "${targetDataset}"?`,
    },
  ]);
}

function generatePatchesForDocument(document) {
  const patches = reduce(
    document,
    (acc, value, keyPath) => {
      const key = keyPath[keyPath.length - 1];
      if (document._type == 'post' && key === 'tags') {
        return key === 'tags'
          ? Object.assign({}, acc, {
              [serializePath(keyPath)]: value.map((t) => ({
                ...t,
                _weak: true,
              })),
            })
          : acc;
      }
      return acc;
    },
    {},
  );

  return Object.keys(patches).length === 0
    ? null
    : {
        document,
        set: patches,
      };
}

function serializePath(path) {
  return path.reduce((target, part, i) => {
    const isIndex = typeof part === 'number';
    const seperator = i === 0 ? '' : '.';
    const add = isIndex ? `[${part}]` : `${seperator}${part}`;
    return `${target}${add}`;
  }, '');
}

function commit(patches, client) {
  return patches
    .reduce(
      (tx, patch) => tx.patch(patch.document._id, { set: patch.set }),
      client.transaction(),
    )
    .commit();
}

function confirm(patches) {
  if (patches.length === 0) {
    return { noop: true };
  }
  const summary = patches.reduce((acc, patch) => {
    return acc
      .concat(`️📃  On document: ${patch.document._id}`)
      .concat(
        Object.keys(patch.set).map(
          (keyPath) => `    ✏  SET ${keyPath} = ${patch.set[keyPath]}\n`,
        ),
      )
      .concat(' ');
  }, []);

  return inquirer
    .prompt([
      {
        name: 'continue',
        type: 'confirm',
        default: false,
        message: `The following operations will be performed:\n \n${summary.join(
          '\n',
        )}\n\nWould you like to continue?`,
      },
    ])
    .then((result) => Object.assign({}, result, { patches }));
}

function getToken() {
  const authToken = new ConfigStore(
    'sanity',
    {},
    { globalConfigPath: true },
  ).get('authToken');

  if (authToken) {
    return Promise.resolve(authToken);
  }

  return inquirer
    .prompt([
      {
        name: 'token',
        type: 'password',
        message: `Please enter a token with write access on project ${sanityConfig.api.projectId}`,
      },
    ])
    .then((result) => result.token);
}

function getClient() {
  return getToken().then((token) =>
    createClient({
      projectId: sanityConfig.api.projectId,
      dataset: targetDataset,
      useCdn: false,
      token,
    }),
  );
}

function run() {
  getClient().then((client) => {
    return fetchAllDocuments(client)
      .then((documents) =>
        documents.map(generatePatchesForDocument).filter(Boolean),
      )
      .then(confirm)
      .then((result) => {
        if (result.noop) {
          return { success: true, noop: true };
        }
        if (result.continue) {
          return commit(result.patches, client).then((res) => {
            return {
              success: true,
              transactionId: res.transactionId,
              documentIds: res.documentIds,
            };
          });
        }
        return { success: false, cancelled: true };
      })
      .then((res) => {
        if (res.noop) {
          console.log('\nNothing to do.\n');
        } else if (res.cancelled) {
          console.log('\nCancelled.\n');
        } else {
          console.log(
            '\n✅  Migrated %d documents in transaction %s.\n',
            res.documentIds.length,
            res.transactionId,
          );
        }
      })
      .catch((error) => {
        console.log(`\nData migration failed: ${error.message}\n`);
      });
  });
}

promptBackup().then(run);
