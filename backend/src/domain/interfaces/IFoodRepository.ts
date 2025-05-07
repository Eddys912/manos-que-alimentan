import { Food } from '../entities/Food';
import { IFoodFilter } from './IFood';

export interface IFoodRepository {
  addFood(food: Food): Promise<Food>;
  findAllFoods(): Promise<Food[]>;
  findFoodById(id: string): Promise<Food | null>;
  findFoodByName(name: string): Promise<boolean>;
  findFoodsByFilter(filters: IFoodFilter): Promise<Food[]>;
  updateFood(food: Food): Promise<Food | null>;
  deleteFood(id: string): Promise<boolean>;
}
