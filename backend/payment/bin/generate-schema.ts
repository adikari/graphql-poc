#!/usr/bin/env node

import { printSubgraphSchema } from '@apollo/subgraph';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { schema } from '../src/server';

// generate the schema to push to apollo federation
// bin/deploy script calls this to generate the schema.graphql file with all schema then pushes to apollo
// apollo will then update the super graphql schema to include the schema defined in this service
try {
  writeFileSync(resolve(process.cwd(), 'schema.graphql'), printSubgraphSchema(schema), 'utf-8');
} catch (error) {
  console.error(error);
  process.exit(1);
}
