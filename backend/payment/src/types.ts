import { Payment, CreatePaymentInput } from './generated/types';

export interface Context {
  Payment: {
    paymentById: (id: string, email: string) => Promise<Payment | undefined>;
    paymentsByUserEmail: (email: string) => Promise<Payment[]>;
    createPayment: (input: CreatePaymentInput) => Promise<Payment>;
  };
}
