import { Food } from '../entities/Food';

export interface IFoodRepository {
  createFood(food: Food): Promise<Food>;
  findAllFoods(): Promise<Food[]>;
  findFoodById(id: string): Promise<Food | null>;
  findFoodByCategory(category: string): Promise<Food | null>;
  updateFood(food: Food): Promise<Food | null>;
  deleteFood(id: string): Promise<boolean>;
}
