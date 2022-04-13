import { Table, Entity } from 'dynamodb-toolbox';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const PaymentTable = new Table({
  name: process.env.PAYMENT_TABLE || 'Payment',
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: new DocumentClient()
});

export const PaymentEntity = new Entity({
  name: 'Payment',
  attributes: {
    user: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    id: { type: 'string', required: true },
    beneficiary: { type: 'string', required: true },
    date: { type: 'string', required: true },
    amount: { type: 'number', required: true }
  },
  table: PaymentTable
});
