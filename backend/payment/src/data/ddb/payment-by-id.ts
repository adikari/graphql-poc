import { Payment } from '../../generated/types';
import { log } from '../../util/logger';
import { PaymentEntity } from './payment';

export const paymentById = async (id: string, email: string): Promise<Payment | undefined> => {
  log.info('getting payment by id', { email });

  const result = await PaymentEntity.get({ user: email, sk: id });

  log.info('get payment by id result', { result });

  return result.Item;
};
