import PaymentCard from './payment-card';
import { useQuery } from 'urql';
import { useUserByEmailQuery } from '../generated/graphql';
import Spinner from './spinner';

export default function Home() {
  const [result] = useUserByEmailQuery({ variables: { email: 'subash.adhikari@paytron.com' } });

  const { data, fetching, error } = result;

  if (fetching) return <Spinner />;

  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Payments</h1>
      <PaymentCard />
    </div>
  );
}
