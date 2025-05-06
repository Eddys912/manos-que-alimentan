import { User } from '../entities/User';

export interface IUserRepository {
  addEmployee(user: User): Promise<User>;
  addClient(user: User): Promise<User>;
  findAllEmployees(): Promise<User[]>;
  findAllClients(): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
