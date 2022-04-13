import { log } from '../../util/logger';
import { PaymentEntity } from './payment';
import { PaymentModel } from './../../types';

export const paymentById = async (id: string, email: string): Promise<PaymentModel | undefined> => {
  log.info('getting payment by id', { email });

  const result = await PaymentEntity.get({ user: email, sk: id });

  log.info('get payment by id result', { result });

  return result.Item;
};
