import { CreateUserInput } from '../../generated/types';
import { UserEntity } from './user';
import { UserModel } from '../../types';
import { log } from '../../util/logger';

// this is data layer. for poc I am also using this as a service layer for simplicity
// for specific use cases where we need to perform authorization, validations, etc its recommended to add those in service layer
// then the service layer will call the data layer to perform the db operation
export const createUser = async (input: CreateUserInput): Promise<UserModel> => {
  log.info('creating user', { input });

  const user = {
    id: input.email,
    sk: input.email,
    name: input.name,
    email: input.email
  };

  const result = await UserEntity.put(user);

  log.info('create user result', { result });

  return user;
};
