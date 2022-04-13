import { Context } from './types';
import { createUser } from './data/ddb/create-user';
import { userByEmail } from './data/ddb/user-by-email';

export const context: Context = {
  User: {
    userByEmail,
    createUser
  }
};
