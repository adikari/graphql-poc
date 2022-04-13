import { Payment } from '../../generated/types';
import { log } from '../../util/logger';
import { PaymentEntity } from './payment';

export const paymentsByUserEmail = async (email: string): Promise<Payment[]> => {
  log.info('getting user by email', { email });

  const result = await PaymentEntity.query({ id: email });

  log.info('get user by email result', { result });

  return result.Items ?? [];
};
