import { User } from '../entities/User';

export interface IUserRepository {
  addUser(user: User): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
