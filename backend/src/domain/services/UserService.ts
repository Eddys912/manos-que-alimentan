import { User } from '../entities/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { UserDTO, toUserDTO } from '../../presentation/dtos/userDTO';
import { CustomException } from '../../shared/utils/CustomException';
import { InputValidator } from '../../shared/utils/InputValidator';
import { UserStatus } from '../enums/UserEnum';
import { IUserFilter } from '../interfaces/IUser';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async createUser(user: User): Promise<UserDTO | null> {
    if (user.getId() == null) user.setId(crypto.randomUUID());
    if (
      user.getStatus() == null ||
      (typeof user.getStatus() === 'string' && user.getStatus().trim() === '')
    )
      user.setStatus(UserStatus.ACTIVE);
    if (user.getCreatedAt() == null) user.setCreatedAt(new Date());

    this.validateUser(user);

    const saveProduct = await this.userRepository.addUser(user);
    if (saveProduct == null) return null;
    return toUserDTO(saveProduct);
  }

  async getAllUsers(user_type: string): Promise<UserDTO[]> {
    const users = await this.userRepository.findAllUsers(user_type);
    if (!users || users.length === 0) {
      // throw CustomException.notFound('No hay usuario registrados.');
      console.log('No se encontraron usuarios de tipo:', user_type);
      return [];
    }
    return users.map((user) => toUserDTO(user));
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findUserById(id);
    if (!user)
      throw CustomException.notFound(
        `No existe un alimento con el identificador proporcionado`
      );

    return toUserDTO(user);
  }

  async getUsersByFilter(filters: IUserFilter): Promise<UserDTO[]> {
    const users = await this.userRepository.findUsersByFilter(filters);
    if (!users || users.length === 0)
      throw CustomException.notFound(
        `No se encontraron alimentos con el filtro proporcionado`
      );

    return users.map((user) => toUserDTO(user));
  }

  async updateUser(user: User): Promise<UserDTO | null> {
    const existingUser = await this.userRepository.findUserById(user.getId());
    if (!existingUser)
      throw CustomException.notFound('No se encontró el usuario a actualizar.');

    const updatedUser = await this.userRepository.updateUser(user);
    if (!updatedUser) return null;

    return toUserDTO(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await this.userRepository.findUserById(id);
    if (!existingUser)
      throw CustomException.notFound(
        `No existe el usuario con el identificador proporcionado`
      );

    const deleted = await this.userRepository.deleteUser(id);
    return deleted;
  }

  private validateUser(user: User) {
    InputValidator.isNotEmpty(user.getFirstName(), 'Nombre');
    InputValidator.isNotEmpty(user.getLastName(), 'Apellido paterno');
    InputValidator.isNotEmpty(user.getBirthDate(), 'Fecha de nacimiento');
    InputValidator.isNotEmpty(user.getEmail(), 'Correo');
    InputValidator.isNotEmpty(user.getPassword(), 'Contraseña');
    InputValidator.isNotEmpty(user.getRole(), 'Rol');
    InputValidator.isNotEmpty(user.getPhone(), 'Teléfono');
    InputValidator.isNotEmpty(user.getAddress(), 'Dirección');
    InputValidator.isNotEmpty(user.getStatus(), 'Estatus');

    if (!Object.values(UserStatus).includes(user.getStatus() as UserStatus))
      throw CustomException.businessRule(`Estatus inválido. Debe ser uno de:
        ${Object.values(UserStatus).join(', ')}`);
  }
}
