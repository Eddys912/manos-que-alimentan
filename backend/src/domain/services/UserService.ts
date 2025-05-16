import crypto from 'crypto';
import { User } from '../entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserDTO, toUserDTO } from '../../presentation/dtos/userDTO';
import { CustomException } from '../../shared/errors/CustomException';
import { isNotEmpty } from '../../shared/utils/inputValidator';
import { UserRole, UserStatus, UserType } from '../enums/User.enum';
import {
  CreateUserProps,
  IUserFilter,
  UpdateUserProps,
} from '../interfaces/IUser';
import bcrypt from 'bcryptjs';
import {
  calculateAge,
  formatDate,
  isValidDate,
} from '../../shared/utils/dateUtils';

/**
 * Service class for user-related business logic and validation.
 * Handles user creation, updates, deletion, filtering and validation.
 */
export class UserService {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Creates a new employee
   * @param {CreateUserProps} props - Input data for the employee
   * @returns {Promise<User>} The created employee user
   * @throws {CustomException} If validation fails or saving fails
   */
  async createEmployee(props: CreateUserProps): Promise<UserDTO> {
    const user = new User({
      ...props,
      id: crypto.randomUUID(),
      role: props.role ?? UserRole.USERS_ADMIN,
      user_type: props.user_type ?? UserType.EMPLOYEE,
      status: props.status || UserStatus.ACTIVE,
      password: await bcrypt.hash(props.password, 10),
    });
    this.validateUser(user);
    const saveProduct = await this.userRepository.addUser(user);
    if (saveProduct == null)
      throw CustomException.businessRule('Error al crear empleado');
    return toUserDTO(saveProduct);
  }

  /**
   * Creates a new client
   * @param {CreateUserProps} props - Input data for the client
   * @returns {Promise<User>} The created client user
   * @throws {CustomException} If validation fails or saving fails
   */
  async createClient(props: CreateUserProps): Promise<UserDTO> {
    const user = new User({
      ...props,
      id: crypto.randomUUID(),
      role: props.role ?? UserRole.USER,
      user_type: props.user_type ?? UserType.CLIENT,
      status: props.status || UserStatus.ACTIVE,
      password: await bcrypt.hash(props.password, 10),
    });
    this.validateUser(user);
    const saveProduct = await this.userRepository.addUser(user);
    if (saveProduct == null)
      throw CustomException.businessRule('Error al crear usuario');
    return toUserDTO(saveProduct);
  }

  /**
   * Updates an existing user by ID
   * @param {string} id - User ID
   * @param {UpdateUserProps} user - Updated user data
   * @returns {Promise<UserDTO | null>} Updated user DTO or null
   * @throws {CustomException} If no changes are found or user doesn't exist
   */
  async updateUser(id: string, user: UpdateUserProps): Promise<UserDTO | null> {
    const existingUser = await this.userRepository.findUserById(id);
    if (!existingUser)
      throw CustomException.notFound('No se encontró el usuario a actualizar.');

    const noChanges = this.noChangesDetected(existingUser, user);
    if (noChanges)
      throw CustomException.businessRule(
        'No se detectaron cambios en el usuario.'
      );

    isNotEmpty(user.role, 'Rol');
    isNotEmpty(user.status, 'Estatus');
    this.validateUser(existingUser);

    this.userUpdated(existingUser, user);

    if (existingUser.getUserType() === UserType.EMPLOYEE) {
      existingUser.setRole(user.role);
    }

    existingUser.setUpdatedAt(new Date());

    const updatedUser = await this.userRepository.updateUser(existingUser);
    if (!updatedUser) return null;
    return toUserDTO(updatedUser);
  }

  /**
   * Deletes a user by ID
   * @param {string} id - User ID
   * @returns {Promise<boolean>} Deletion result
   * @throws {CustomException} If the user is not found
   */
  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findUserById(id);
    if (!existingUser)
      throw CustomException.notFound(
        `No existe el usuario con el identificador proporcionado`
      );

    const deleted = await this.userRepository.deleteUser(id);
    return deleted;
  }

  /**
   * Retrieves all users of a given type
   * @param {string} user_type - The user type to filter by
   * @returns {Promise<UserDTO[]>} List of users
   * @throws {CustomException} If no users are found
   */
  async getAllUsers(user_type: UserType): Promise<UserDTO[]> {
    const users = await this.userRepository.findAllUsers(user_type);
    if (!users || users.length === 0) {
      throw CustomException.notFound('No hay usuario registrados.');
    }
    return users.map((user) => toUserDTO(user));
  }

  /**
   * Filters users by optional criteria
   * @param {IUserFilter} filters - Filtering options
   * @returns {Promise<UserDTO[]>} Filtered user list
   * @throws {CustomException} If no users match the filters
   */
  async getUsersByFilter(filters: IUserFilter): Promise<UserDTO[]> {
    const users = await this.userRepository.findUsersByFilter(filters);
    if (!users || users.length === 0)
      throw CustomException.notFound(
        `No se encontraron usuarios con el filtro proporcionado`
      );

    return users.map((user) => toUserDTO(user));
  }

  /**
   * Retrieves a user by ID
   * @param {string} id - User ID
   * @returns {Promise<UserDTO>} User DTO
   * @throws {CustomException} If user is not found
   */
  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findUserById(id);
    if (!user)
      throw CustomException.notFound(
        `No existe un usuario con el identificador proporcionado`
      );

    return toUserDTO(user);
  }

  /**
   * Validates required user fields and enum values.
   * @param {User} user - The user entity to validate.
   * @throws {CustomException} If validation fails.
   */
  private validateUser(user: User) {
    isNotEmpty(user.getFirstName(), 'Nombre');
    isNotEmpty(user.getLastName(), 'Apellido paterno');
    isNotEmpty(user.getBirthDate(), 'Fecha de nacimiento');
    isNotEmpty(user.getEmail(), 'Correo');
    isNotEmpty(user.getPassword(), 'Contraseña');
    isNotEmpty(user.getPhone(), 'Teléfono');
    isNotEmpty(user.getAddress(), 'Dirección');
    isNotEmpty(user.getStatus(), 'Estatus');

    if (!isValidDate(user.getBirthDate()))
      throw CustomException.businessRule('La fecha de nacimiento no es válida');

    if (calculateAge(user.getBirthDate()) < 18)
      throw CustomException.businessRule(
        'La edad minima para registrase es de 18 años'
      );

    if (!Object.values(UserStatus).includes(user.getStatus() as UserStatus))
      throw CustomException.businessRule(
        `Estatus inválido. Debe ser uno de:
        ${Object.values(UserStatus).join(', ')}`
      );

    if (!Object.values(UserRole).includes(user.getRole() as UserRole))
      throw CustomException.businessRule(
        `Rol inválido. Debe ser uno de:
        ${Object.values(UserRole).join(', ')}`
      );

    if (!Object.values(UserType).includes(user.getUserType() as UserType))
      throw CustomException.businessRule(
        `Tipo de usuario inválido. Debe ser uno de:
        ${Object.values(UserType).join(', ')}`
      );
  }

  /**
   * Checks whether the user object has changes compared to existing user.
   * @param {User} existingUser - The current user.
   * @param {UpdateUserProps} user - The updated values.
   * @returns {boolean} True if no changes are detected.
   */
  private noChangesDetected(
    existingUser: User,
    user: UpdateUserProps
  ): boolean {
    return (
      existingUser.getFirstName() === user.first_name &&
      existingUser.getLastName() === user.last_name &&
      existingUser.getMiddleName() === (user.middle_name ?? null) &&
      formatDate(existingUser.getBirthDate()) == formatDate(user.birth_date) &&
      existingUser.getEmail() === user.email &&
      existingUser.getPhone() === (user.phone ?? null) &&
      existingUser.getAddress() === user.address &&
      existingUser.getStatus() === user.status &&
      (existingUser.getUserType() !== UserType.EMPLOYEE ||
        existingUser.getRole() === user.role)
    );
  }

  /**
   * Updates the properties of the user entity.
   * @param {User} existingUser - The user to update.
   * @param {UpdateUserProps} user - The updated values.
   */
  private userUpdated(existingUser: User, user: UpdateUserProps): void {
    existingUser.setFirstName(user.first_name);
    existingUser.setLastName(user.last_name);
    existingUser.setMiddleName(user.middle_name ?? null);
    existingUser.setBirthDate(user.birth_date);
    existingUser.setEmail(user.email);
    existingUser.setPhone(user.phone ?? null);
    existingUser.setAddress(user.address);
    existingUser.setStatus(user.status);
  }
}
