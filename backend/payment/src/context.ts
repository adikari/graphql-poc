import { Context } from './types';
import { createPayment } from './data/ddb/create-payment';
import { paymentsByUserEmail } from './data/ddb/payment-by-user-email';
import { paymentById } from './data/ddb/payment-by-id';
import { convert } from './data/api/get-exchange-rates';

export const context: Context = {
  Payment: {
    paymentById,
    paymentsByUserEmail,
    createPayment
  },
  Exchange: {
    convert
  }
};
