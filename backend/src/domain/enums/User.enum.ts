/**
 * Enum representing the type of user in the system.
 * CLIENT for clients, EMPLOYEE for administrative/staff users.
 */
export enum UserType {
  CLIENT = 'Cliente',
  EMPLOYEE = 'Empleado',
}

/**
 * Enum representing the available user roles.
 * Defines the level of access or module responsibility.
 */
export enum UserRole {
  USER = 'Usuario',
  ADMIN = 'Administrador',
  USERS_ADMIN = 'Gestor de usuarios',
  FOOD_ADMIN = 'Gestor de alimentos',
  EMPLOYEES_ADMIN = 'Gestor de empleados',
}

/**
 * Enum representing the status of a user account.
 * Determines if a user is active, blocked, or inactive.
 */
export enum UserStatus {
  ACTIVE = 'Activo',
  BLOCKED = 'Bloqueado',
  INACTIVE = 'Inactivo',
}
