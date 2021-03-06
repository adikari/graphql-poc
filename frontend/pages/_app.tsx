import '../styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider } from 'urql';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';
import { client, ssr } from '../client/graphql';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  // hydrate the frontend client with the data received from the server
  // if some queries were resolved in the server then it will be cached automatically in the frontend
  if (pageProps.urqlState) {
    ssr.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={client}>
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </Provider>
  );
}
