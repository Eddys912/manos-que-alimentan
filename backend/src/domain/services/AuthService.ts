import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../infraestructure/repositories/UserRepository';
import { CustomException } from '../../shared/errors/CustomException';
import { isNotEmpty } from '../../shared/utils/inputValidator';

/**
 * Service responsible for handling authentication logic.
 * Provides methods for user login and JWT token generation.
 */
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Logon a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<string>} JWT token upon successful authentication.
   * @throws {CustomException} If validation fails or saving fails
   */
  async login(email: string, password: string): Promise<string> {
    isNotEmpty(email, 'Correo');
    isNotEmpty(password, 'Contraseña');

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) throw CustomException.notFound('Usuario no encontrado.');

    const passwordMatch = await bcrypt.compare(password, user.getPassword());

    if (!passwordMatch)
      throw CustomException.validation('Credenciales incorrectas.');

    const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || ('1d' as any);

    const token = jwt.sign(
      {
        id: user.getId(),
        name:
          user.getFirstName() +
          ' ' +
          user.getLastName() +
          ' ' +
          user.getMiddleName(),
        email: user.getEmail(),
        role: user.getRole(),
      },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    return token;
  }
}
