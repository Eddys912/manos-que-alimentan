import { Food } from '../../domain/entities/Food';
import { formatDate } from '../../shared/utils/formatDate';

export interface FoodDTO {
  id: string;
  food_name: string;
  image: string;
  category: string;
  expiration_date: string;
  quantity: number;
  status: string;
}

export const toFoodDTO = (food: Food): FoodDTO => {
  return {
    id: food.getId(),
    food_name: food.getFoodName(),
    image: food.getImage(),
    category: food.getCategory(),
    expiration_date: formatDate(food.getExpirationDate()),
    quantity: food.getQuantity(),
    status: food.getStatus(),
  };
};
