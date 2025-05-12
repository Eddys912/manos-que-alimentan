import { Food } from '../../domain/entities/Food';
import { IFoodRepository } from '../../domain/interfaces/IFoodRepository';
import { FoodDTO, toFoodDTO } from '../../presentation/dtos/foodDTO';
import { CustomException } from '../../shared/errors/CustomException';
import { formatDate } from '../../shared/utils/dateUtils';
import { isNotEmpty } from '../../shared/utils/inputValidator';
import { FoodCategory, FoodStatus } from '../enums/Food.enum';
import {
  CreateFoodProps,
  IFoodFilter,
  UpdateFoodProps,
} from '../interfaces/IFood';

/**
 * Service class for food-related business logic and validation.
 * Handles food creation, updates, deletion, filtering and validation.
 */
export class FoodService {
  constructor(private foodRepository: IFoodRepository) {}

  /**
   * Creates a new food
   * @param {CreateFoodProps} props - Input data for the food
   * @returns {Promise<Food>} The created food
   * @throws {CustomException} If validation fails or saving fails
   */
  async createFood(props: CreateFoodProps): Promise<FoodDTO> {
    const food = new Food({
      ...props,
      id: crypto.randomUUID(),
      status: FoodStatus.AVAILABLE,
    });
    this.validateFood(food);
    const saveProduct = await this.foodRepository.addFood(food);
    if (saveProduct == null)
      throw CustomException.businessRule('Error al crear alimento');
    return toFoodDTO(saveProduct);
  }

  /**
   * Updates an existing food by ID
   * @param {string} id - Food ID
   * @param {UpdateFoodProps} food - Updated food data
   * @returns {Promise<FoodDTO | null>} Updated food DTO or null
   * @throws {CustomException} If no changes are found or food doesn't exist
   */
  async updateFood(id: string, food: UpdateFoodProps): Promise<FoodDTO | null> {
    const existingFood = await this.foodRepository.findFoodById(id);
    if (!existingFood)
      throw CustomException.notFound(
        'No se encontró el alimento a actualizar.'
      );

    const noChanges = this.noChangesDetected(existingFood, food);
    if (noChanges)
      throw CustomException.businessRule(
        'No se detectaron cambios en el alimento.'
      );

    this.validateFood(existingFood);

    this.foodUpdated(existingFood, food);

    existingFood.setUpdatedAt(new Date());

    const updatedFood = await this.foodRepository.updateFood(existingFood);
    if (!updatedFood) return null;

    return toFoodDTO(updatedFood);
  }

  /**
   * Deletes a food by ID
   * @param {string} id - Food ID
   * @returns {Promise<boolean>} Deletion result
   * @throws {CustomException} If the food is not found
   */
  async deleteFood(id: string): Promise<boolean> {
    const existingFood = await this.foodRepository.findFoodById(id);
    if (!existingFood)
      throw CustomException.notFound(
        `No existe el alimento con el identificador proporcionado`
      );

    const deleted = await this.foodRepository.deleteFood(id);
    return deleted;
  }

  /**
   * Retrieves all foods of a given type
   * @returns {Promise<FoodDTO[]>} List of foods
   * @throws {CustomException} If no foods are found
   */
  async getAllFoods(): Promise<FoodDTO[]> {
    const foods = await this.foodRepository.findAllFoods();
    if (!foods || foods.length === 0)
      throw CustomException.notFound('No hay alimentos registrados.');
    return foods.map((food) => toFoodDTO(food));
  }

  /**
   * Filters foods by optional criteria
   * @param {IFoodFilter} filters - Filtering options
   * @returns {Promise<UserDTO[]>} Filtered food list
   * @throws {CustomException} If no foods match the filters
   */
  async getFoodsByFilter(filters: IFoodFilter): Promise<FoodDTO[]> {
    const foods = await this.foodRepository.findFoodsByFilter(filters);
    if (!foods || foods.length === 0)
      throw CustomException.notFound(
        `No se encontraron alimentos con el filtro proporcionado`
      );

    return foods.map((food) => toFoodDTO(food));
  }

  /**
   * Retrieves a food by ID
   * @param {string} id - Food ID
   * @returns {Promise<FoodDTO>} Food DTO
   * @throws {CustomException} If food is not found
   */
  async getFoodById(id: string): Promise<FoodDTO> {
    const food = await this.foodRepository.findFoodById(id);
    if (!food)
      throw CustomException.notFound(
        `No existe un alimento con el identificador proporcionado`
      );

    return toFoodDTO(food);
  }

  /**
   * Validates required food fields and enum values.
   * @param {Food} food - The food entity to validate.
   * @throws {CustomException} If validation fails.
   */
  private validateFood(food: Food) {
    isNotEmpty(food.getFoodName(), 'Nombre');
    isNotEmpty(food.getImage(), 'Imágen');
    isNotEmpty(food.getCategory(), 'Categoría');
    isNotEmpty(food.getExpirationDate(), 'Fecha de expiración');
    isNotEmpty(food.getQuantity(), 'Cantidad');

    if (new Date(food.getExpirationDate()) < new Date())
      throw CustomException.businessRule(
        'La fecha de expiración no puede ser anterior a hoy.'
      );

    if (food.getQuantity() <= 0)
      throw CustomException.businessRule('La cantidad debe ser mayor a cero.');

    if (!Object.values(FoodStatus).includes(food.getStatus() as FoodStatus))
      throw CustomException.businessRule(
        `Estatus inválido. Debe ser uno de: 
        ${Object.values(FoodStatus).join(', ')}`
      );

    if (
      !Object.values(FoodCategory).includes(food.getCategory() as FoodCategory)
    )
      throw CustomException.businessRule(
        `Categoría de alimento inválido. Debe ser uno de: 
        ${Object.values(FoodCategory).join(', ')}`
      );
  }

  /**
   * Checks whether the food object has changes compared to existing food.
   * @param {Food} existingFood - The current food.
   * @param {UpdateFoodProps} food - The updated values.
   * @returns {boolean} True if no changes are detected.
   */
  private noChangesDetected(
    existingFood: Food,
    food: UpdateFoodProps
  ): boolean {
    return (
      existingFood.getFoodName() === food.food_name &&
      existingFood.getCategory() === food.category &&
      formatDate(existingFood.getExpirationDate()) ==
        formatDate(food.expiration_date) &&
      existingFood.getQuantity() === food.quantity &&
      existingFood.getStatus() === food.status
    );
  }

  /**
   * Updates the properties of the food entity.
   * @param {Food} existingFood - The food to update.
   * @param {UpdateFoodProps} food - The updated values.
   */
  private foodUpdated(existingFood: Food, food: UpdateFoodProps): void {
    existingFood.setFoodName(food.food_name);
    existingFood.setCategory(food.category);
    existingFood.setExpirationDate(food.expiration_date);
    existingFood.setQuantity(food.quantity);
    existingFood.setStatus(food.status);
  }
}
