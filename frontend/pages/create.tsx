import Layout from '../components/layout';
import CreatePaymentForm from '../components/crete-payment';
import { ReactElement } from 'react';
import { Session } from 'next-auth';

interface HomePageProps {
  session: Session;
}

export default function HomePage({ session }: HomePageProps) {
  return <CreatePaymentForm email={session.user.email} />;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Create Payment">{page}</Layout>;
};
