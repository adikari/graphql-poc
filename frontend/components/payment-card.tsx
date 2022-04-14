import Link from 'next/link';
import { Payment } from '../generated/graphql';

interface PaymentCardProps {
  payment: Omit<Payment, 'user'>;
}

export default function PaymentCard({ payment }: PaymentCardProps) {
  return (
    <div className="p-6 bg-gray-800 rounded-lg border border-gray-200 shadow-md">
      <a href="#">
        <h5 className="mb-4 text-5xl font-bold tracking-tight text-gray-100">${payment.amount}</h5>
      </a>

      <p className="mb-2 font-normal text-gray-400">
        paid to <span className="text-gray-100">{payment.beneficiary}</span>
      </p>

      <p className="mb-6 font-normal text-gray-400">
        on <span className="text-gray-100">{payment.date}</span>
      </p>

      <Link href={`/view/${payment.id}`}>
        <a className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-blue-300">
          View Payment
          <svg
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
      </Link>
    </div>
  );
}
