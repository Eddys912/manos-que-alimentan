import { Food } from '../../domain/entities/Food';
import { FoodCategory, FoodStatus } from '../../domain/enums/Food.enum';
import { IFoodFilter, IFoodProps } from '../../domain/interfaces/IFood';
import { IFoodRepository } from '../../domain/interfaces/IFoodRepository';
import { handlePostgresError } from '../../shared/utils/handleDatabaseError';
import pool from '../database/connection';

/**
 * Repository class for food data persistence operations in PostgreSQL database
 * @implements {IFoodRepository}
 */
export class FoodRepository implements IFoodRepository {
  /**
   * Creates a new food in the database
   * @param {Food} food - The food entity to be saved
   * @returns {Promise<Food>} The saved food entity
   * @throws {UniqueConstraintError} When a unique constraint is violated
   * @throws {NotNullViolationError} When required fields are missing
   * @throws {EnumViolationError} When an invalid enum value is provided
   * @throws {DatabaseError} For other database-related errors
   */
  async addFood(food: Food): Promise<Food> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const query = `
        INSERT INTO foods ( 
          id, food_name, image_url, category, expiration_date, quantity, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;

      const values = [
        food.getId(),
        food.getFoodName(),
        food.getImage(),
        food.getCategory(),
        food.getExpirationDate(),
        food.getQuantity(),
        food.getStatus(),
      ];

      const result = await client.query(query, values);
      await client.query('COMMIT');

      return this.createFoodFromRow(result.rows[0]);
    } catch (error: any) {
      await client.query('ROLLBACK');
      handlePostgresError(error, 'crear alimento');
    } finally {
      client.release();
    }
  }

  /**
   * Updates an existing food in the database
   * @param {Food} food - The food entity with updated values
   * @returns {Promise<Food>} The updated food entity
   * @throws {UniqueConstraintError} When a unique constraint is violated
   * @throws {NotNullViolationError} When required fields are missing
   * @throws {EnumViolationError} When an invalid enum value is provided
   * @throws {DatabaseError} For other database-related errors
   */
  async updateFood(food: Food): Promise<Food> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const query = `
        UPDATE foods SET 
          food_name = $1, image = $2, category = $3,
          expiration_date = $4, quantity = $5, status = $6,
          updated_at = $7
        WHERE id = $8
        RETURNING *
      `;

      const values = [
        food.getFoodName(),
        food.getImage(),
        food.getCategory(),
        food.getExpirationDate(),
        food.getQuantity(),
        food.getStatus(),
        food.getUpdatedAt(),
        food.getId(),
      ];

      const result = await client.query(query, values);

      if (result.rowCount === 0)
        throw new Error(`Alimento con ID ${food.getId()} no encontrado`);

      await client.query('COMMIT');
      return this.createFoodFromRow(result.rows[0]);
    } catch (error: any) {
      await client.query('ROLLBACK');
      handlePostgresError(error, 'actualizar alimento');
    } finally {
      client.release();
    }
  }

  /**
   * Deletes a food from the database by ID
   * @param {string} id - The ID of the food to delete
   * @returns {Promise<boolean>} True if deletion was successful
   * @throws {ForeignKeyConstraintError} When food is referenced by other records
   * @throws {DatabaseError} For other database-related errors
   */
  async deleteFood(id: string): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const query = 'DELETE FROM foods WHERE id = $1 RETURNING id';
      const result = await client.query(query, [id]);

      if (result.rowCount === 0)
        throw new Error(`Alimento con ID ${id} no encontrado`);

      await client.query('COMMIT');
      return true;
    } catch (error: any) {
      await client.query('ROLLBACK');
      handlePostgresError(error, 'eliminar alimento');
    } finally {
      client.release();
    }
  }

  /**
   * Retrieves all foods of a specific type
   * @returns {Promise<Food[]>} Array of food entities
   * @throws {DatabaseError} For database-related errors
   */
  async findAllFoods(): Promise<Food[]> {
    try {
      const query = 'SELECT * FROM foods';
      const result = await pool.query<IFoodProps>(query);

      return result.rows.map((row: IFoodProps) => this.createFoodFromRow(row));
    } catch (error: any) {
      handlePostgresError(error, 'buscar todos los alimentos');
      return [];
    }
  }
  /**
   * Finds a food by their ID
   * @param {string} id - The ID of the food to find
   * @returns {Promise<Food | null>} The found food entity or null if not found
   * @throws {DatabaseError} For database-related errors
   */
  async findFoodById(id: string): Promise<Food | null> {
    try {
      const query = 'SELECT * FROM foods WHERE id = $1';
      const result = await pool.query<IFoodProps>(query, [id]);
      if (result.rowCount === 0) return null;

      return this.createFoodFromRow(result.rows[0]);
    } catch (error: any) {
      handlePostgresError(error, 'buscar alimento por id');
      return null;
    }
  }

  /**
   * Searches for foods based on filter criteria
   * @param {IFoodFilter} filters - Filter criteria for searching foods
   * @returns {Promise<Food[]>} Array of matching food entities
   * @throws {DatabaseError} For database-related errors
   */
  async findFoodsByFilter(filters: IFoodFilter): Promise<Food[]> {
    try {
      const values: any[] = [];
      const conditions: string[] = [];
      let paramIndex = 1;

      if (filters.name) {
        const nameValue = `%${filters.name.toLowerCase()}%`;

        const subConditions = ['food_name', 'category', 'status::text'].map(
          (field) => {
            values.push(nameValue);
            return `LOWER(${field}) LIKE $${paramIndex++}`;
          }
        );

        conditions.push(`(${subConditions.join(' OR ')})`);
      }

      if (filters.category) {
        values.push(filters.category);
        conditions.push(`LOWER(category) = $${paramIndex++}`);
      }

      if (filters.status) {
        values.push(filters.status);
        conditions.push(`LOWER(status::text) = $${paramIndex++}`);
      }

      const whereClause =
        conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const query = `SELECT * FROM foods ${whereClause};`;

      const result = await pool.query<IFoodProps>(query, values);

      return result.rows.map((row: IFoodProps) => this.createFoodFromRow(row));
    } catch (error: any) {
      handlePostgresError(error, 'buscar alimentos por filtro');
    }
  }

  /**
   * Creates a Food entity from a database row
   * @private
   * @param {IFoodProps} row - Database row with food properties
   * @returns {Food} Constructed Food entity
   */
  private createFoodFromRow(row: IFoodProps): Food {
    return new Food({
      id: row.id,
      food_name: row.food_name,
      image_url: row.image_url,
      category: row.category as FoodCategory,
      expiration_date: new Date(row.expiration_date),
      quantity: row.quantity,
      status: row.status as FoodStatus,
    });
  }
}
