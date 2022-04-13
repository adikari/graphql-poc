import { ApolloServer } from 'apollo-server-lambda';
import { buildSubgraphSchema } from '@apollo/federation';
import * as userSchema from './graphql/user';

export const schema = buildSubgraphSchema([userSchema]);

const server = new ApolloServer({ schema });

export const handler = server.createHandler();
