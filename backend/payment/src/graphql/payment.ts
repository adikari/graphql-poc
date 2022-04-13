import gql from 'graphql-tag';
import { Resolvers } from '../generated/types';

export const typeDefs = gql`
  type Query {
    paymentById(id: ID!, email: String!): Payment
    paymentsByUserEmail(email: String!): [Payment]
  }

  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment
  }

  input CreatePaymentInput {
    user: ID!
    beneficiary: String!
    amount: Int!
    date: String!
  }

  type Payment @key(fields: "id") {
    id: ID!
    beneficiary: String!
    amount: Int!
    date: String!
    user: User!
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }
`;

export const resolvers: Resolvers = {
  Query: {
    paymentById: (_, args, context) => context.Payment.paymentById(args.id, args.email),
    paymentsByUserEmail: (_, args, context) => context.Payment.paymentsByUserEmail(args.email)
  },
  Mutation: {
    createPayment: (_, args, context) => context.Payment.createPayment(args.input)
  }
};
