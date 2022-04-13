import { ApolloServer } from 'apollo-server-lambda';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { context } from './context';
import * as paymentSchema from './graphql/payment';

export const schema = buildSubgraphSchema([paymentSchema]);

const server = new ApolloServer({ schema, context });

export const handler = server.createHandler();
