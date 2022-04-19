import { ApolloServer } from 'apollo-server-lambda';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { context } from './context';
import * as userSchema from './graphql/user';

// Build the subgraph schema for user service. If we had multiple schemas witin user service we would pass them all to buildSubgraphSchema
export const schema = buildSubgraphSchema([userSchema]);

// instantiate the apoll server with the provided schema and the context
// context is where we would put all our service definitions and viewer information (eg. user id, scopes) so that we can access them in graphql resolver
const server = new ApolloServer({ schema, context });

export const handler = server.createHandler();
