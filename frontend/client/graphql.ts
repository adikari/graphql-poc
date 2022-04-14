import { createClient, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  CreatePaymentMutation,
  Payment,
  UserByEmailDocument,
  UserByEmailQuery
} from '../generated/graphql';

const cache = cacheExchange({
  resolvers: {
    Payment: {
      date: (payment: Payment) => new Date(payment.date).toDateString()
    }
  },
  updates: {
    Mutation: {
      createPayment(result: CreatePaymentMutation, _args, cache) {
        const query = {
          query: UserByEmailDocument,
          variables: { email: result.createPayment?.user.id }
        };

        cache.updateQuery(query, (data: UserByEmailQuery | null) => {
          if (!data || !data.userByEmail) {
            return null;
          }

          if (!result.createPayment) {
            return { userByEmail: data.userByEmail };
          }

          const payments = data?.userByEmail?.payments ?? [];

          return {
            userByEmail: {
              ...data?.userByEmail,
              payments: [...payments, result.createPayment]
            }
          };
        });
      }
    }
  }
});

export const ssr = ssrExchange({
  isClient: typeof window !== 'undefined'
});

export const client = createClient({
  url: 'https://5et6hgc47c.execute-api.us-east-1.amazonaws.com/graphql',
  exchanges: [devtoolsExchange, dedupExchange, cache, ssr, fetchExchange]
});
