import { useCreatePaymentMutation } from '../generated/graphql';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface CreatePaymentFormProps {
  email: string;
}

export default function CreatePaymentForm(props: CreatePaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [_, createPayment] = useCreatePaymentMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payment = {
      amount: parseInt(formData.get('amount') as string),
      beneficiary: formData.get('beneficiary') as string,
      date: formData.get('date') as string,
      user: props.email
    };

    try {
      const { data } = await createPayment({ input: payment });

      if (data?.createPayment) {
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-[640px]" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="beneficiary" className="block mb-2 text-sm font-medium text-gray-900">
          Beneficiary email
        </label>
        <input
          type="email"
          name="beneficiary"
          id="beneficiary"
          disabled={loading}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          disabled={loading}
          id="amount"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">
          Payment Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          disabled={loading}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:bg-gray-200"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-blue-300"
      >
        Create Payment
      </button>

      <Link href="/">
        <a className="text-gray-700 ml-6 bg-gray-200 shadow-sm focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center hover:bg-gray-300">
          Back
        </a>
      </Link>
    </form>
  );
}
