import { FoodStatus } from '../enums/FoodEnum';

export interface IFoodProps {
  id: string;
  food_name: string;
  image: string;
  category: string;
  expiration_date: Date;
  quantity: number;
  status: FoodStatus;
  created_at: Date;
  updated_at: Date | null;
}
