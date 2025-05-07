import { User } from '../../domain/entities/User';
import { formatDate } from '../../shared/utils/formatDate';

export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birthDate: string;
  email: string;
  role: string;
  status: string;
  phone: string | null;
  address: string;
}

export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.getId(),
    first_name: user.getFirstName(),
    last_name: user.getLastName(),
    middle_name: user.getMiddleName(),
    birthDate: formatDate(user.getBirthDate()),
    email: user.getEmail(),
    role: user.getRole(),
    status: user.getStatus(),
    phone: user.getPhone(),
    address: user.getAddress(),
  };
};
