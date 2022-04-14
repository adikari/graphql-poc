import PaymentCardList from '../components/payment-card-list';
import Layout from '../components/layout';
import { ReactElement } from 'react';

export default function HomePage() {
  return (
    <>
      <PaymentCardList />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="All Payments">{page}</Layout>;
};
