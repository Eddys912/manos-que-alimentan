import { User } from '../../domain/entities/User';
import { UserRole, UserStatus, UserType } from '../../domain/enums/User.enum';
import { IUserFilter, IUserProps } from '../../domain/interfaces/IUser';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { handlePostgresError } from '../../shared/utils/handleDatabaseError';
import pool from '../database/connection';

/**
 * Repository class for user data persistence operations in PostgreSQL database
 * @implements {IUserRepository}
 */
export class UserRepository implements IUserRepository {
  /**
   * Creates a new user in the database
   * @param {User} user - The user entity to be saved
   * @returns {Promise<User>} The saved user entity
   * @throws {UniqueConstraintError} When a unique constraint is violated
   * @throws {NotNullViolationError} When required fields are missing
   * @throws {EnumViolationError} When an invalid enum value is provided
   * @throws {DatabaseError} For other database-related errors
   */
  async addUser(user: User): Promise<User> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const query = `
        INSERT INTO users (
          id, first_name, last_name, middle_name, birth_date,
          email, password, role, phone, address, user_type, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;

      const values = [
        user.getId(),
        user.getFirstName(),
        user.getLastName(),
        user.getMiddleName(),
        user.getBirthDate(),
        user.getEmail(),
        user.getPassword(),
        user.getRole(),
        user.getPhone(),
        user.getAddress(),
        user.getUserType(),
        user.getStatus(),
      ];

      const result = await client.query(query, values);
      await client.query('COMMIT');

      return this.createUserFromRow(result.rows[0]);
    } catch (error: any) {
      await client.query('ROLLBACK');
      handlePostgresError(error, 'crear usuario');
    } finally {
      client.release();
    }
  }

  /**
   * Updates an existing user in the database
   * @param {User} user - The user entity with updated values
   * @returns {Promise<User>} The updated user entity
   * @throws {UniqueConstraintError} When a unique constraint is violated
   * @throws {NotNullViolationError} When required fields are missing
   * @throws {EnumViolationError} When an invalid enum value is provided
   * @throws {DatabaseError} For other database-related errors
   */
  async updateUser(user: User): Promise<User> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const query = `
        UPDATE users SET 
          first_name = $1, last_name = $2, middle_name = $3, 
          birth_date = $4, email = $5, role = $6, 
          status = $7, phone = $8, address = $9, 
          user_type = $10, updated_at = $11
        WHERE id = $12
        RETURNING *
      `;

      const values = [
        user.getFirstName(),
        user.getLastName(),
        user.getMiddleName(),
        user.getBirthDate(),
        user.getEmail(),
        user.getRole(),
        user.getStatus(),
        user.getPhone(),
        user.getAddress(),
        user.getUserType(),
        user.getUpdatedAt(),
        user.getId(),
      ];

      const result = await client.query(query, values);

      if (result.rowCount === 0)
        throw new Error(`Usuario con ID ${user.getId()} no encontrado`);

      await client.query('COMMIT');
      return this.createUserFromRow(result.rows[0]);
    } catch (error: any) {
      await client.query('ROLLBACK');
      handlePostgresError(error, 'actualizar usuario');
    } finally {
      client.release();
    }
  }

  /**
   * Deletes a user from the database by ID
   * @param {string} id - The ID of the user to delete
   * @returns {Promise<boolean>} True if deletion was successful
   * @throws {ForeignKeyConstraintError} When user is referenced by other records
   * @throws {DatabaseError} For other database-related errors
   */
  async deleteUser(id: string): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
      const result = await client.query(query, [id]);

      if (result.rowCount === 0)
        throw new Error(`Usuario con ID ${id} no encontrado`);

      await client.query('COMMIT');
      return true;
    } catch (error: any) {
      await client.query('ROLLBACK');
      handlePostgresError(error, 'eliminar usuario');
    } finally {
      client.release();
    }
  }

  /**
   * Retrieves all users of a specific type
   * @param {UserType} user_type - The type of users to retrieve
   * @returns {Promise<User[]>} Array of user entities
   * @throws {DatabaseError} For database-related errors
   */
  async findAllUsers(user_type: UserType): Promise<User[]> {
    try {
      const query =
        'SELECT * FROM users WHERE LOWER(user_type::text) = LOWER($1)';
      const result = await pool.query<IUserProps>(query, [user_type]);
      return result.rows.map((row: IUserProps) => this.createUserFromRow(row));
    } catch (error: any) {
      handlePostgresError(error, 'buscar usuarios por tipo');
      return [];
    }
  }

  /**
   * Finds a user by their ID
   * @param {string} id - The ID of the user to find
   * @returns {Promise<User | null>} The found user entity or null if not found
   * @throws {DatabaseError} For database-related errors
   */
  async findUserById(id: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query<IUserProps>(query, [id]);
      if (result.rowCount === 0) return null;

      return this.createUserFromRow(result.rows[0]);
    } catch (error: any) {
      handlePostgresError(error, 'buscar usuario por ID');
      return null;
    }
  }

  /**
   * Finds a user by their email address
   * @param {string} email - The email of the user to find
   * @returns {Promise<User | null>} The found user entity or null if not found
   * @throws {DatabaseError} For database-related errors
   */
  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE LOWER(email) = LOWER($1)';
      const result = await pool.query<IUserProps>(query, [email]);
      if (result.rowCount === 0) return null;

      return this.createUserFromRow(result.rows[0]);
    } catch (error: any) {
      handlePostgresError(error, 'buscar usuario por email');
      return null;
    }
  }

  /**
   * Searches for users based on filter criteria
   * @param {IUserFilter} filters - Filter criteria for searching users
   * @returns {Promise<User[]>} Array of matching user entities
   * @throws {DatabaseError} For database-related errors
   */
  async findUsersByFilter(filters: IUserFilter): Promise<User[]> {
    try {
      const values: any[] = [];
      const conditions: string[] = [];
      let paramIndex = 1;

      if (filters.name) {
        const nameValue = `%${filters.name.toLowerCase()}%`;

        const subConditions = [
          'first_name',
          'last_name',
          'middle_name',
          'email',
          'role::text',
          'status::text',
          'address',
        ].map((field) => {
          values.push(nameValue);
          return `LOWER(${field}) LIKE $${paramIndex++}`;
        });

        conditions.push(`(${subConditions.join(' OR ')})`);
      }

      if (filters.email) {
        values.push(filters.email.toLowerCase());
        conditions.push(`LOWER(email) = $${paramIndex++}`);
      }

      if (filters.role) {
        values.push(filters.role.toLowerCase());
        conditions.push(`LOWER(role::text) = $${paramIndex++}`);
      }

      if (filters.status) {
        values.push(filters.status.toLowerCase());
        conditions.push(`LOWER(status::text) = $${paramIndex++}`);
      }

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

      const query = `SELECT * FROM users ${whereClause};`;

      const result = await pool.query<IUserProps>(query, values);

      return result.rows.map((row: IUserProps) => this.createUserFromRow(row));
    } catch (error: any) {
      handlePostgresError(error, 'buscar usuarios por filtro');
      return [];
    }
  }

  /**
   * Creates a User entity from a database row
   * @private
   * @param {IUserProps} row - Database row with user properties
   * @returns {User} Constructed User entity
   */
  private createUserFromRow(row: IUserProps): User {
    return new User({
      id: row.id,
      first_name: row.first_name,
      last_name: row.last_name,
      middle_name: row.middle_name ?? null,
      birth_date: new Date(row.birth_date),
      email: row.email,
      password: row.password,
      role: row.role as UserRole,
      phone: row.phone ?? null,
      address: row.address,
      user_type: row.user_type as UserType,
      status: row.status as UserStatus,
    });
  }
}
