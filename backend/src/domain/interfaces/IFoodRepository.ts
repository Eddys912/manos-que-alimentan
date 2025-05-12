import { Food } from '../entities/Food';
import { IFoodFilter } from './IFood';

/**
 * Repository interface for food persistence operations.
 * Abstracts all data access logic for the Food entity.
 */
export interface IFoodRepository {
  addFood(food: Food): Promise<Food>;
  findAllFoods(): Promise<Food[]>;
  findFoodById(id: string): Promise<Food | null>;
  findFoodsByFilter(filters: IFoodFilter): Promise<Food[]>;
  updateFood(food: Food): Promise<Food | null>;
  deleteFood(id: string): Promise<boolean>;
}
