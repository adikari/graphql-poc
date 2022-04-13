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
    beneficiary: String!
    amount: Int!
    date: String!
  }

  type Payment {
    id: ID!
    beneficiary: String!
    amount: Int!
    date: String!
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
