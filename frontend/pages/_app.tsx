import '../styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Provider, createClient } from 'urql';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = createClient({
  url: 'https://bgyn2ati22.execute-api.us-east-1.amazonaws.com/graphql'
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <Provider value={client}>
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </Provider>
  );
}
