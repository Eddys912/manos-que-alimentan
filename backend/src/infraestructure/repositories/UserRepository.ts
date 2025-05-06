import { User } from '../../domain/entities/User';
import { UserRole, UserType } from '../../domain/enums/UserEnum';
import { IUserProps } from '../../domain/interfaces/IUserProps';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { handleDatabaseError } from '../../shared/utils/handleDatabaseError';
import pool from '../database/connection';

export class UserRepository implements IUserRepository {
  async addUser(user: User): Promise<User> {
    try {
      const query = `INSERT INTO users (
                      id, first_name, last_name,
                      middle_name, birth_date,
                      email, password, role,
                      phone, address, user_type,
                      created_at, updated_at
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
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
        user.getCreatedAt(),
        user.getUpdatedAt(),
      ];
      await pool.query(query, values);
      return user;
    } catch (e: any) {
      handleDatabaseError(e, 'crear alimento');
    }
  }

  async updateUser(user: User): Promise<User> {
    try {
      const query = `UPDATE users SET 
                        first_name = $1, last_name = $2, middle_name = $3, 
                        birth_date = $4, password = $5, role = $6,
                        phone = $7, address = $8, user_type = $9,
                        updated_at = $10
                    WHERE id = $11`;
      const values = [
        user.getFirstName(),
        user.getLastName(),
        user.getMiddleName(),
        user.getBirthDate(),
        user.getPassword(),
        user.getRole(),
        user.getPhone(),
        user.getAddress(),
        user.getUserType(),
        user.getUpdatedAt(),
        user.getId(),
      ];
      await pool.query(query, values);
      return user;
    } catch (e: any) {
      handleDatabaseError(e, 'actualizar alimento');
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      await pool.query(query, [id]);
      return true;
    } catch (e: any) {
      handleDatabaseError(e, 'eliminar alimento');
    }
  }

  async findAllUsers(): Promise<User[]> {
    try {
      const query = 'SELECT * FROM users WHERE user_type = $1';
      const values = ['Employee'];
      const result = await pool.query<IUserProps>(query, values);

      return result.rows.map((row: IUserProps) => this.createUserFromRow(row));
    } catch (e: any) {
      handleDatabaseError(e, 'buscar alimentos');
    }
  }

  async findUserById(id: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query<IUserProps>(query, [id]);
      if (result.rowCount === 0) return null;

      return this.createUserFromRow(result.rows[0]);
    } catch (e: any) {
      handleDatabaseError(e, 'buscar alimento por ID');
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query<IUserProps>(query, [email]);
      if (result.rowCount === 0) return null;

      return this.createUserFromRow(result.rows[0]);
    } catch (e: any) {
      handleDatabaseError(e, 'buscar alimento por email');
    }
  }

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
      created_at: new Date(row.created_at),
      updated_at: row.updated_at ? new Date(row.updated_at) : null,
    });
  }
}
