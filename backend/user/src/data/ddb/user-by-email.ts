import { log } from '../../util/logger';
import { UserEntity } from './user';
import { UserModel } from '../../types';

export const userByEmail = async (email: string): Promise<UserModel | undefined> => {
  log.info('getting user by email', { email });

  const result = await UserEntity.get({ id: email, sk: email });

  log.info('get user by email result', { result });

  return result.Item;
};
