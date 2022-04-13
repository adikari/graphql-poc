import { CreateUserInput, User } from '../../generated/types';

export const createUser = (input: CreateUserInput): User => {
  return { id: 'id', ...input };
};
