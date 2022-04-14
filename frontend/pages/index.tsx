import PaymentCardList from '../components/payment-card-list';
import Layout from '../components/layout';
import { ReactElement } from 'react';
import { Session } from 'next-auth';

interface HomePageProps {
  session: Session;
}

export default function HomePage({ session }: HomePageProps) {
  return <PaymentCardList email={session?.user?.email} />;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="All Payments">{page}</Layout>;
};
