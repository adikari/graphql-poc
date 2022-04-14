import { createClient, dedupExchange, fetchExchange } from 'urql';
import { devtoolsExchange } from '@urql/devtools';
import { cacheExchange } from '@urql/exchange-graphcache';
import { CreatePaymentMutation, UserByEmailDocument, UserByEmailQuery } from '../generated/graphql';

const cache = cacheExchange({
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

export const client = createClient({
  url: 'https://bgyn2ati22.execute-api.us-east-1.amazonaws.com/graphql',
  exchanges: [devtoolsExchange, dedupExchange, cache, fetchExchange]
});
