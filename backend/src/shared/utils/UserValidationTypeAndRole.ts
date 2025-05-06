import { UserRole, UserType } from '../../domain/enums/UserEnum';

export const validateRole = (role: UserRole): UserRole => {
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }

  throw new Error('Rol de usuario no válido');
};

export const validateUserType = (userType: string): UserType => {
  if (Object.values(UserType).includes(userType as UserType)) {
    return userType as UserType;
  }

  throw new Error('Tipo de usuario no válido');
};
