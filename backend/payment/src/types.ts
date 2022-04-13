import { CreatePaymentInput, ExchangeRate } from './generated/types';

export interface PaymentModel {
  id: string;
  amount: number;
  beneficiary: string;
  date: string;
  user: string;
}

export interface Context {
  Payment: {
    paymentById: (id: string, email: string) => Promise<PaymentModel | undefined>;
    paymentsByUserEmail: (email: string) => Promise<PaymentModel[]>;
    createPayment: (input: CreatePaymentInput) => Promise<PaymentModel>;
  };
  Exchange: {
    convert: (from: string, to: string, amount: number) => Promise<ExchangeRate>;
  };
}
