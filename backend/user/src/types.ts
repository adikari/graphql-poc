import { User, CreateUserInput } from './generated/types';

export interface Context {
  User: {
    userByEmail: (email: string) => Promise<User | undefined>;
    createUser: (input: CreateUserInput) => Promise<User>;
  };
}
