import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePaymentInput = {
  amount: Scalars['Int'];
  beneficiary: Scalars['String'];
  date: Scalars['String'];
  user: Scalars['ID'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  rate: Scalars['Float'];
  total: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPayment?: Maybe<Payment>;
  createUser?: Maybe<User>;
};

export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Int'];
  beneficiary: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['ID'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  exchangeRates?: Maybe<ExchangeRate>;
  paymentById?: Maybe<Payment>;
  paymentsByUserEmail?: Maybe<Array<Payment>>;
  userByEmail?: Maybe<User>;
};

export type QueryExchangeRatesArgs = {
  amount: Scalars['Float'];
  from: Scalars['String'];
  to: Scalars['String'];
};

export type QueryPaymentByIdArgs = {
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type QueryPaymentsByUserEmailArgs = {
  email: Scalars['String'];
};

export type QueryUserByEmailArgs = {
  email: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  payments?: Maybe<Array<Payment>>;
};

export type GetExchangeRateQueryVariables = Exact<{
  from: Scalars['String'];
  to: Scalars['String'];
  amount: Scalars['Float'];
}>;

export type GetExchangeRateQuery = {
  __typename?: 'Query';
  exchangeRates?: { __typename?: 'ExchangeRate'; total: number; rate: number } | null;
};

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['ID'];
}>;

export type UserByEmailQuery = {
  __typename?: 'Query';
  userByEmail?: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    email: string;
    payments?: Array<{
      __typename?: 'Payment';
      id: string;
      beneficiary: string;
      date: string;
      amount: number;
    }> | null;
  } | null;
};

export type GetPaymentsByIdQueryVariables = Exact<{
  id: Scalars['ID'];
  email: Scalars['String'];
}>;

export type GetPaymentsByIdQuery = {
  __typename?: 'Query';
  paymentById?: {
    __typename?: 'Payment';
    id: string;
    beneficiary: string;
    date: string;
    amount: number;
    user: { __typename?: 'User'; id: string; name?: string | null };
  } | null;
};

export type CreatePaymentMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;

export type CreatePaymentMutation = {
  __typename?: 'Mutation';
  createPayment?: {
    __typename?: 'Payment';
    id: string;
    beneficiary: string;
    date: string;
    amount: number;
    user: { __typename?: 'User'; id: string };
  } | null;
};

export const GetExchangeRateDocument = gql`
  query GetExchangeRate($from: String!, $to: String!, $amount: Float!) {
    exchangeRates(from: $from, to: $to, amount: $amount) {
      total
      rate
    }
  }
`;

export function useGetExchangeRateQuery(
  options: Omit<Urql.UseQueryArgs<GetExchangeRateQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetExchangeRateQuery>({ query: GetExchangeRateDocument, ...options });
}
export const UserByEmailDocument = gql`
  query UserByEmail($email: ID!) {
    userByEmail(email: $email) {
      id
      name
      email
      payments {
        id
        beneficiary
        date
        amount
      }
    }
  }
`;

export function useUserByEmailQuery(
  options: Omit<Urql.UseQueryArgs<UserByEmailQueryVariables>, 'query'>
) {
  return Urql.useQuery<UserByEmailQuery>({ query: UserByEmailDocument, ...options });
}
export const GetPaymentsByIdDocument = gql`
  query GetPaymentsById($id: ID!, $email: String!) {
    paymentById(id: $id, email: $email) {
      id
      beneficiary
      date
      amount
      user {
        id
        name
      }
    }
  }
`;

export function useGetPaymentsByIdQuery(
  options: Omit<Urql.UseQueryArgs<GetPaymentsByIdQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetPaymentsByIdQuery>({ query: GetPaymentsByIdDocument, ...options });
}
export const CreatePaymentDocument = gql`
  mutation CreatePayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      id
      beneficiary
      date
      amount
      user {
        id
      }
    }
  }
`;

export function useCreatePaymentMutation() {
  return Urql.useMutation<CreatePaymentMutation, CreatePaymentMutationVariables>(
    CreatePaymentDocument
  );
}
