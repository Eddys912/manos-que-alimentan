import { Food } from '../entities/Food';

export interface IFoodRepository {
  createFood(food: Food): Promise<Food>;
  updateFood(food: Food): Promise<Food>;
  deleteFood(id: string): Promise<void>;
  findFoodById(id: string): Promise<Food | null>;
  findFoodByCategory(category: string): Promise<Food | null>;
  findAllFoods(): Promise<Food[]>;
}
