import { CreateUserInput } from './generated/types';

export interface UserModel {
  id: string;
  name?: string;
  email: string;
}

export interface Context {
  User: {
    userByEmail: (email: string) => Promise<UserModel | undefined>;
    createUser: (input: CreateUserInput) => Promise<UserModel>;
  };
}
