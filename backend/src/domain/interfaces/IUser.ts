import { UserType, UserRole, UserStatus } from '../enums/User.enum';

/**
 * Base interface representing a full user entity with all required fields.
 */
export interface IUserProps {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birth_date: Date;
  email: string;
  password: string;
  role: UserRole;
  phone: string;
  address: string;
  user_type: UserType;
  status: UserStatus;
}

/**
 * DTO type used when creating a new user.
 * Excludes 'id' as it is auto-generated.
 */
export type CreateUserProps = Omit<IUserProps, 'id'>;

/**
 * DTO type used when updating an existing user.
 * Excludes 'id', 'password' and 'user_type' since they cannot be changed here.
 */
export type UpdateUserProps = Omit<IUserProps, 'id' | 'password' | 'user_type'>;

/**
 * Filter options for searching users.
 * All fields are optional and nullable.
 */
export interface IUserFilter {
  name?: string | null;
  email?: string | null;
  role?: string | null;
  status?: string | null;
}
