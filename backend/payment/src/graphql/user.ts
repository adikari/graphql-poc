import gql from 'graphql-tag';
import { Resolvers } from '../generated/types';

export const typeDefs = gql`
  type Query {
    hello: String
  }
`;

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
};
