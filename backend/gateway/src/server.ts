import { ApolloServer } from 'apollo-server-lambda';
import { ApolloGateway } from '@apollo/gateway';

// create instance of apollo gateway then pass it to the apollo server
// this is responsible for creating the gateway and exposing it to the client
// this service should be as dumb as possible as this is single point of failure
// client will be talking to gateway to resolve all queries from all services (eg. payment, user)
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
