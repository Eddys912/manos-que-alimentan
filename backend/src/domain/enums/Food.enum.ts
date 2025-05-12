/**
 * Enum representing the category of food in the system.
 * Used to classify food by type or nutritional group.
 */
export enum FoodCategory {
  SEEDS = 'Semillas',
  CANNING = 'Enlatados',
  DAIRY = 'Lácteos',
  VEGETABLES = 'Verduras',
  FRUITS = 'Frutas',
  PROTEINS = 'Proteínas',
}

/**
 * Enum representing the status of a food.
 * Determines if a food is available, out of stock, or discontinued.
 */
export enum FoodStatus {
  AVAILABLE = 'Disponible',
  OUT_OF_STOCK = 'Agotado',
  DISCONTINUED = 'Descontinuado',
}
