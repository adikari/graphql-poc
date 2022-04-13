import axios from 'axios';
import { ExchangeRate } from '../../generated/types';
import { log } from '../../util/logger';

interface ExchangeRateResult {
  success: boolean;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

export const getExchangeRates = async (base: string): Promise<ExchangeRateResult> => {
  const url = `https://api.exchangerate.host/latest?base=${base}`;
  const result = await axios.get<ExchangeRateResult>(url);
  return result.data;
};

export const convert = async (from: string, to: string, amount: number): Promise<ExchangeRate> => {
  log.info('getting exchange rates', { from, to, amount });
  const result = await getExchangeRates(from);

  log.info('exchange rate result', { result });

  if (!result.success) {
    throw new Error('Failed to get exchange rates');
  }

  const rate = result.rates[to];

  if (!rate) {
    throw new Error(`Failed to get exchange rate for ${to}`);
  }

  return {
    total: rate * amount,
    rate
  };
};
