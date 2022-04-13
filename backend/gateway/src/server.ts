import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway();

const server = new ApolloServer({
  gateway,
  apollo: {
    key: process.env.APOLLO_KEY,
    graphId: process.env.APOLLO_GRAPH_ID,
    graphVariant: process.env.APOLLO_GRAPH_VARIANT
  }
});

export const handler = server.createHandler();
