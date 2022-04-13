import { createUser } from './data/ddb/create-user';
import { getUserById } from './data/ddb/user-by-id';
import { Context } from './types';

export const context: Context = {
  User: {
    userById: getUserById,
    createUser
  }
};
