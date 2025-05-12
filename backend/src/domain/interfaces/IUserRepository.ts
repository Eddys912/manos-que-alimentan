import { User } from '../entities/User';
import { UserType } from '../enums/User.enum';
import { IUserFilter } from './IUser';

/**
 * Repository interface for user persistence operations.
 * Abstracts all data access logic for the User entity.
 */
export interface IUserRepository {
  addUser(user: User): Promise<User>;
  findAllUsers(user_type: UserType): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUsersByFilter(filters: IUserFilter): Promise<User[]>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}
