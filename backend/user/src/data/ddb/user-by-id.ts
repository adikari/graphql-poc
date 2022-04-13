import { User } from '../../generated/types';

export const getUserById = async (id: string): Promise<User> => {
  return {
    id,
    name: 'John Doe',
    email: ''
  };
};
