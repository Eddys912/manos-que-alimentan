import { User } from '../entities/User';
import { IUserFilter } from './IUser';

export interface IUserRepository {
  addUser(user: User): Promise<User>;
  findAllUsers(user_type: string): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUsersByFilter(filters: IUserFilter): Promise<User[]>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
