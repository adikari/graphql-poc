import { Table, Entity } from 'dynamodb-toolbox';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const UserTable = new Table({
  name: process.env.USER_TABLE || 'User',
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: new DocumentClient()
});

export const UserEntity = new Entity({
  name: 'User',
  attributes: {
    id: { partitionKey: true },
    sk: { hidden: true, sortKey: true },
    name: { type: 'string', required: false },
    email: { type: 'string', required: 'always' }
  },
  table: UserTable
});
