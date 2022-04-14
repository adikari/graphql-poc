import Head from 'next/head';
import PaymentCardList from '../components/payment-card-list';
import Layout from '../components/layout';
import { ReactElement } from 'react';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>GraphQL POC</title>
        <meta name="description" content="GraphQL POC App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container px-4 py-6 mx-auto">
        <PaymentCardList />
      </div>
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
