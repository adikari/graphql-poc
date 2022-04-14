import PaymentCard from './payment-card';
import { useUserByEmailQuery } from '../generated/graphql';
import Spinner from './spinner';

interface PaymentCardListProps {
  email: string;
}

export default function PaymentCardList({ email }: PaymentCardListProps) {
  const [result] = useUserByEmailQuery({ variables: { email } });

  const { data, fetching, error } = result;

  if (fetching) return <Spinner />;

  if (error) return <p>Oh no... something went wrong</p>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data?.userByEmail?.payments?.map(payment => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
}
