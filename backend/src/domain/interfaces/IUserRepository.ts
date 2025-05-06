import { User } from '../entities/User';

export interface IUserRepository {
  createUser(user: User): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: string): Promise<void>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findAllEmployees(): Promise<User[]>;
  findAllClients(): Promise<User[]>;
}
