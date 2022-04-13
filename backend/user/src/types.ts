import { User, CreateUserInput } from './generated/types';

export interface Context {
  User: {
    userById: (id: string) => Promise<User>;
    createUser: (input: CreateUserInput) => Promise<User>;
  };
}
