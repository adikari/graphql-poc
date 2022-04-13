import { CreatePaymentInput, Payment } from '../../generated/types';
import { PaymentEntity } from './payment';
import { log } from '../../util/logger';
import { nanoid } from 'nanoid';

export const createPayment = async (input: CreatePaymentInput): Promise<Payment> => {
  log.info('creating payment', { input });

  const id = nanoid();

  const payment = {
    id,
    sk: id,
    user: input.user,
    beneficiary: input.beneficiary,
    date: new Date(input.date).toISOString(),
    amount: input.amount
  };

  const result = await PaymentEntity.put(payment);

  log.info('create payment result', { result });

  return payment;
};
