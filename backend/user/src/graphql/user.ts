import gql from 'graphql-tag';
import { Resolvers } from '../generated/types';

export const typeDefs = gql`
  type Query {
    userByEmail(email: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

  input CreateUserInput {
    name: String
    email: String!
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    email: String!
  }
`;

export const resolvers: Resolvers = {
  Query: {
    userByEmail: (_, args, context) => context.User.userByEmail(args.email)
  },
  Mutation: {
    createUser: (_, args, context) => context.User.createUser(args.input)
  },
  User: {
    __resolveReference: (user, context) => context.User.userByEmail(user.id)
  }
};
