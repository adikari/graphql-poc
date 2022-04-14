import PaymentCardList from '../components/payment-card-list';
import Layout from '../components/layout';
import { ReactElement } from 'react';
import { Session } from 'next-auth';

interface HomePageProps {
  session: Session;
}

export default function HomePage({ session }: HomePageProps) {
  return <>Create payment</>;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Create Payment">{page}</Layout>;
};
