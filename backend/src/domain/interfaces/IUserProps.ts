import { UserType, UserRole } from '../enums/UserEnum';

export interface IUserProps {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birth_date: Date;
  email: string;
  password: string;
  role: UserRole;
  phone: string | null;
  address: string;
  user_type: UserType;
  created_at: Date;
  updated_at: Date | null;
}
