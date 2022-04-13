#!/usr/bin/env node

import { printSubgraphSchema } from '@apollo/subgraph';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { schema } from '../src/server';

try {
  writeFileSync(resolve(process.cwd(), 'schema.graphql'), printSubgraphSchema(schema), 'utf-8');
} catch (error) {
  console.error(error);
}
