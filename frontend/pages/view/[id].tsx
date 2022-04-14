import Layout from '../../components/layout';
import { ReactElement } from 'react';
import { Session } from 'next-auth';
import { GetPaymentsByIdDocument, useGetPaymentsByIdQuery } from '../../generated/graphql';
import { GetServerSidePropsContext } from 'next';
import { client, ssr } from '../../client/graphql';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

interface ViewPaymentPageProps {
  session: Session;
  paymentId: string;
}

export default function ViewPaymentPage({ session, paymentId }: ViewPaymentPageProps) {
  const [result] = useGetPaymentsByIdQuery({
    variables: {
      id: paymentId,
      email: session.user.email
    }
  });

  const payment = result.data?.paymentById;

  if (!payment) {
    return <>Payment does not exist</>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">${payment.amount}</h2>
      <p>Beneficiary {payment.beneficiary}</p>
      <p>Payment date {payment.date}</p>
      <Link href="/">
        <a className="inline-block mt-4 bg-gray-200 hover:bg-gray-400 px-4 py-1 rounded-md">
          Go back
        </a>
      </Link>
    </>
  );
}

ViewPaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="View Payment (SSR)">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const query = context.query;

  if (!query.id) {
    return { redirect: { destination: '/', permanent: false } };
  }

  const session = await getSession(context);

  if (!session?.user) {
    return { redirect: { destination: '/', permanent: false } };
  }

  await client
    .query(GetPaymentsByIdDocument, { id: query.id, email: session.user.email })
    .toPromise();

  return { props: { paymentId: query.id, urqlState: ssr.extractData() } };
}
