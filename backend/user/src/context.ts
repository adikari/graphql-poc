import { Context } from './types';
import { createUser } from './data/ddb/create-user';
import { userByEmail } from './data/ddb/user-by-email';

// GraphQL context
// this is where we would put all services that we need to acccess from graphql server
// if we also had user information coming from api gateway event, we would put them here to access user id, scopes etc in resolver
export const context: Context = {
  User: {
    userByEmail,
    createUser
  }
};
