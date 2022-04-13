import { ApolloServer } from 'apollo-server-lambda';
import { resolvers, typeDefs } from './graphql/user';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

export const handler = server.createHandler();
