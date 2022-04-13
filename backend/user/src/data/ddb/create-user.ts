import { CreateUserInput, User } from '../../generated/types';
import { UserEntity } from './user';
import { log } from '../../util/logger';

export const createUser = async (input: CreateUserInput): Promise<User> => {
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
