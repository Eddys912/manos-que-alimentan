import { FoodStatus } from '../../domain/enums/Food.enum';

/**
 * Validates if a given value is a valid FoodStatus enum value.
 *
 * @param {string} foodStatus - The food status to validate.
 * @returns {FoodStatus} The validated food status.
 * @throws {Error} If the status is not valid.
 */
export const validateFoodStatus = (foodStatus: string): FoodStatus => {
  if (Object.values(FoodStatus).includes(foodStatus as FoodStatus)) {
    return foodStatus as FoodStatus;
  }

  throw new Error('Estatus de alimento no válido');
};
