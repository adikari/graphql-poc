#!/usr/bin/env node

import { printSubgraphSchema } from '@apollo/subgraph';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { schema } from '../src/server';

const output = resolve(process.cwd(), 'schema.graphql');

Promise.resolve()
  .then(() => printSubgraphSchema(schema))
  .then(s => writeFileSync(output, s, 'utf-8'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
