import { CreateUserInput, User } from '../../generated/types';

export const createUser = async (input: CreateUserInput): Promise<User> => {
  return { id: 'id', ...input };
};
