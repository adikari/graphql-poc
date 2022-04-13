import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway } from '@apollo/gateway';

const gateway = new ApolloGateway();

export const handler = new ApolloServer({
  gateway,
  apollo: {
    key: process.env.APOLLO_KEY,
    graphId: process.env.APOLLO_GRAPH_ID,
    graphVariant: process.env.APOLLO_GRAPH_VARIANT
  }
});
