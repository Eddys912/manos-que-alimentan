import { FoodStatus } from '../enums/Food.enum';

/**
 * Base interface representing a full food entity with all required fields.
 */
export interface IFoodProps {
  id: string;
  food_name: string;
  image_url: string;
  category: string;
  expiration_date: Date;
  quantity: number;
  status: FoodStatus;
}

/**
 * DTO type used when creating a new food.
 * Excludes 'id' as it is auto-generated.
 */
export type CreateFoodProps = Omit<IFoodProps, 'id'>;

/**
 * DTO type used when updating an existing food.
 * Excludes 'id' since they cannot be changed here.
 */
export type UpdateFoodProps = Omit<IFoodProps, 'id'>;

/**
 * Filter options for searching foods.
 * All fields are optional and nullable.
 */
export interface IFoodFilter {
  name?: string | null;
  category?: string | null;
  status?: string | null;
}
