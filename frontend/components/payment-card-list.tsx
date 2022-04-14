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
    <div>
      <div className="flex gap-10">
        {data?.userByEmail?.payments?.map(payment => (
          <PaymentCard key={payment.id} payment={payment} />
        ))}
      </div>
    </div>
  );
}
