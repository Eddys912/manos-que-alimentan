import { UserRole, UserStatus, UserType } from '../../domain/enums/User.enum';

/**
 * Validates if a given role is a valid UserRole enum value.
 *
 * @param {UserRole} role - Role to validate.
 * @returns {UserRole} The validated role.
 * @throws {Error} If the role is not valid.
 */
export function validateRole(role: UserRole): UserRole {
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }

  throw new Error('Rol de usuario no válido');
}

/**
 * Validates if a given value is a valid UserType enum value.
 *
 * @param {string} userType - The user type to validate.
 * @returns {UserType} The validated user type.
 * @throws {Error} If the user type is not valid.
 */
export function validateUserType(userType: string): UserType {
  if (Object.values(UserType).includes(userType as UserType)) {
    return userType as UserType;
  }

  throw new Error('Tipo de usuario no válido');
}

/**
 * Validates if a given value is a valid UserStatus enum value.
 *
 * @param {string} userStatus - The user status to validate.
 * @returns {UserStatus} The validated user status.
 * @throws {Error} If the status is not valid.
 */
export const validateUserStatus = (userStatus: string): UserStatus => {
  if (Object.values(UserStatus).includes(userStatus as UserStatus)) {
    return userStatus as UserStatus;
  }

  throw new Error('Estatus de usuario no válido');
};
