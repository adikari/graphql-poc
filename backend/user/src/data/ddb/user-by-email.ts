import { User } from '../../generated/types';
import { log } from '../../util/logger';
import { UserEntity } from './user';

export const userByEmail = async (email: string): Promise<User | undefined> => {
  log.info('getting user by email', { email });

  const result = await UserEntity.get({ id: email, sk: email });

  log.info('get user by email result', { result });

  return result.Item;
};
