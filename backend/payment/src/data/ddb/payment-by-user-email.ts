import { PaymentModel } from './../../types';
import { log } from '../../util/logger';
import { PaymentEntity } from './payment';

export const paymentsByUserEmail = async (email: string): Promise<PaymentModel[]> => {
  log.info('getting user payment email', { email });

  const result = await PaymentEntity.query(email);

  log.info('get payment by email result', { result });

  return result.Items ?? [];
};
