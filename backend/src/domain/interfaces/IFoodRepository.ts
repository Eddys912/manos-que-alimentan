import { Food } from '../entities/Food';

export interface IFoodRepository {
  createFood(food: Food): Promise<Food>;
  findAllFoods(): Promise<Food[]>;
  findFoodById(id: string): Promise<Food | null>;
  findFoodsByCategory(category: string): Promise<Food[]>;
  updateFood(food: Food): Promise<Food | null>;
  deleteFood(id: string): Promise<boolean>;
}
