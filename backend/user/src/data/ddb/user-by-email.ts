import { log } from '../../util/logger';
import { UserEntity } from './user';
import { UserModel } from '../../types';

// this is data layer. for poc I am also using this as a service layer for simplicity
// for specific use cases where we need to perform authorization, validations, etc its recommended to add those in service layer
// then the service layer will call the data layer to perform the db operation
// I am using dynamodb-toolbox for simplifying the db operations
export const userByEmail = async (email: string): Promise<UserModel | undefined> => {
  log.info('getting user by email', { email });

  const result = await UserEntity.get({ id: email, sk: email });

  log.info('get user by email result', { result });

  return result.Item;
};
