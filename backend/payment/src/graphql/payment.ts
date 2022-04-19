import gql from 'graphql-tag';
import { Resolvers } from '../generated/types';

export const typeDefs = gql`
  type Query {
    paymentById(id: ID!, email: String!): Payment
    paymentsByUserEmail(email: String!): [Payment!]
    exchangeRates(from: String!, to: String!, amount: Float!): ExchangeRate
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

  type ExchangeRate {
    rate: Float!
    total: Float!
  }

  type Payment @key(fields: "id") {
    id: ID!
    beneficiary: String!
    amount: Int!
    date: String!
    user: User!
  }

  type User @key(fields: "id") {
    id: ID!
    payments: [Payment!]
  }
`;

export const resolvers: Resolvers = {
  Query: {
    paymentById: (_, args, context) => context.Payment.paymentById(args.id, args.email),
    paymentsByUserEmail: (_, args, context) => context.Payment.paymentsByUserEmail(args.email),
    exchangeRates: (_, args, context) => context.Exchange.convert(args.from, args.to, args.amount)
  },
  Mutation: {
    createPayment: (_, args, context) => context.Payment.createPayment(args.input)
  },
  Payment: {
    user: payment => ({ __typename: 'User', id: payment.user })
  },
  User: {
    payments: (user, _, context) => context.Payment.paymentsByUserEmail(user.id)
  }
};
