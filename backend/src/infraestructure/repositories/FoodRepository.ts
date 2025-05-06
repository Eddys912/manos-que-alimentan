import { Food } from '../../domain/entities/Food';
import { IFoodProps } from '../../domain/interfaces/IFoodProps';
import { IFoodRepository } from '../../domain/interfaces/IFoodRepository';
import { handleDatabaseError } from '../../shared/utils/handleDatabaseError';
import pool from '../database/connection';

export class FoodRepository implements IFoodRepository {
  async addFood(food: Food): Promise<Food> {
    try {
      const query = `INSERT INTO foods ( 
                      id, food_name, image, category, expiration_date,
                      quantity, status, created_at, updated_at
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
      const values = [
        food.getId(),
        food.getFoodName(),
        food.getImage(),
        food.getCategory(),
        food.getExpirationDate(),
        food.getQuantity(),
        food.getStatus(),
        food.getCreatedAt(),
        food.getUpdatedAt(),
      ];
      await pool.query(query, values);
      return food;
    } catch (e: any) {
      handleDatabaseError(e, 'crear alimento');
    }
  }

  async findAllFoods(): Promise<Food[]> {
    try {
      const query = 'SELECT * FROM foods';
      const result = await pool.query<IFoodProps>(query);

      return result.rows.map((row: IFoodProps) => this.createFoodFromRow(row));
    } catch (e: any) {
      handleDatabaseError(e, 'buscar todos los alimentos');
    }
  }

  async findFoodById(id: string): Promise<Food | null> {
    try {
      const query = 'SELECT * FROM foods WHERE id = $1';
      const result = await pool.query<IFoodProps>(query, [id]);
      if (result.rowCount === 0) return null;

      return this.createFoodFromRow(result.rows[0]);
    } catch (e: any) {
      handleDatabaseError(e, 'buscar alimento por id');
    }
  }

  async findFoodsByCategory(category: string): Promise<Food[]> {
    try {
      const query = 'SELECT * FROM foods WHERE category = $1';
      const result = await pool.query<IFoodProps>(query, [category]);
      if (result.rowCount === 0) return [];

      return result.rows.map((row: IFoodProps) => this.createFoodFromRow(row));
    } catch (e: any) {
      handleDatabaseError(e, 'buscar alimentos por categoría');
    }
  }

  async updateFood(food: Food): Promise<Food> {
    try {
      const query = `UPDATE foods SET 
                        food_name = $1, image = $2, category = $3, expiration_date = $4, 
                        quantity = $5, status = $6, updated_at = $7
                    WHERE id = $8`;
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
      await pool.query(query, values);
      return food;
    } catch (e: any) {
      handleDatabaseError(e, 'actualizar alimento');
    }
  }

  async deleteFood(id: string): Promise<boolean> {
    try {
      const query = 'DELETE FROM foods WHERE id = $1';
      await pool.query(query, [id]);
      return true;
    } catch (e: any) {
      handleDatabaseError(e, 'eliminar alimento');
    }
  }

  private createFoodFromRow(row: IFoodProps): Food {
    return new Food({
      id: row.id,
      food_name: row.food_name,
      image: row.image,
      category: row.category,
      expiration_date: new Date(row.expiration_date),
      quantity: row.quantity,
      status: row.status,
      created_at: new Date(row.created_at),
      updated_at: row.updated_at ? new Date(row.updated_at) : null,
    });
  }
}
