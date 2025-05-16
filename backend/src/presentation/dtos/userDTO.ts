import { User } from '../../domain/entities/User';
import { formatDate } from '../../shared/utils/dateUtils';

/**
 * Data Transfer Object (DTO) representing the public shape of a User entity.
 * Used to expose user information in API responses.
 */
export interface UserDTO {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  birth_date: string;
  email: string;
  hire_date: string;
  role: string;
  phone: string | null;
  address: string;
  status: string;
}

/**
 * Maps a User domain entity to a UserDTO.
 * Formats dates and filters out sensitive/internal fields.
 *
 * @param {User} user - The User entity to transform.
 * @returns {UserDTO} The mapped User DTO.
 */
export const toUserDTO = (user: User): UserDTO => {
  return {
    id: user.getId(),
    first_name: user.getFirstName(),
    last_name: user.getLastName(),
    middle_name: user.getMiddleName(),
    birth_date: formatDate(user.getBirthDate()),
    email: user.getEmail(),
    role: user.getRole(),
    hire_date: formatDate(user.getCreatedAt()),
    phone: user.getPhone(),
    address: user.getAddress(),
    status: user.getStatus(),
  };
};
