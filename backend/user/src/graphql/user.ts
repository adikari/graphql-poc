import gql from 'graphql-tag';
import { Resolvers } from '../generated/types';

export const typeDefs = gql`
  type Query {
    userById(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input CreateUserInput {
    name: String
    email: String!
  }

  type User {
    id: ID!
    name: String
    email: String!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    userById: (_, args, context) => context.User.userById(args.id)
  },
  Mutation: {
    createUser: (_, args, context) => context.User.createUser(args.input)
  }
};
