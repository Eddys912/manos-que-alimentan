import { Food } from '../../domain/entities/Food';
import { IFoodRepository } from '../../domain/interfaces/IFoodRepository';
import { FoodDTO, toFoodDTO } from '../../presentation/dtos/foodDTO';
import { CustomException } from '../../shared/utils/CustomException';
import { InputValidator } from '../../shared/utils/InputValidator';
import { FoodStatus } from '../enums/FoodEnum';
import { IFoodFilter } from '../interfaces/IFood';

export class FoodService {
  constructor(private foodRepository: IFoodRepository) {}

  async createFood(food: Food): Promise<FoodDTO | null> {
    if (food.getId() == null) food.setId(crypto.randomUUID());
    if (
      food.getStatus() == null ||
      (typeof food.getStatus() === 'string' && food.getStatus().trim() === '')
    )
      food.setStatus(FoodStatus.AVAILABLE);
    if (food.getCreatedAt() == null) food.setCreatedAt(new Date());

    this.validateFood(food);
    await this.ensureNameIsUnique(food.getFoodName());

    const saveProduct = await this.foodRepository.addFood(food);
    if (saveProduct == null) return null;
    return toFoodDTO(saveProduct);
  }

  async getAllFoods(): Promise<FoodDTO[]> {
    const foods = await this.foodRepository.findAllFoods();
    if (!foods || foods.length === 0)
      throw CustomException.notFound('No hay alimentos registrados.');
    return foods.map((food) => toFoodDTO(food));
  }

  async getFoodById(id: string): Promise<FoodDTO> {
    const food = await this.foodRepository.findFoodById(id);
    if (!food)
      throw CustomException.notFound(
        `No existe un alimento con el identificador proporcionado`
      );

    return toFoodDTO(food);
  }

  async getFoodsByFilter(filters: IFoodFilter): Promise<FoodDTO[]> {
    const foods = await this.foodRepository.findFoodsByFilter(filters);
    if (!foods || foods.length === 0)
      throw CustomException.notFound(
        `No se encontraron alimentos con el filtro proporcionado`
      );

    return foods.map((food) => toFoodDTO(food));
  }

  async updateFood(food: Food): Promise<FoodDTO | null> {
    const existingFood = await this.foodRepository.findFoodById(food.getId());
    if (!existingFood)
      throw CustomException.notFound(
        'No se encontró el alimento a actualizar.'
      );

    const updatedFood = await this.foodRepository.updateFood(food);
    if (!updatedFood) return null;

    return toFoodDTO(food);
  }

  async deleteFood(id: string): Promise<boolean> {
    const existingFood = await this.foodRepository.findFoodById(id);
    if (!existingFood)
      throw CustomException.notFound(
        `No existe el alimento con el identificador proporcionado`
      );

    const deleted = await this.foodRepository.deleteFood(id);
    return deleted;
  }

  private validateFood(food: Food) {
    InputValidator.isNotEmpty(food.getFoodName(), 'Nombre');
    InputValidator.isNotEmpty(food.getImage(), 'Imagen');
    InputValidator.isNotEmpty(food.getCategory(), 'Categoría');
    InputValidator.isNotEmpty(food.getExpirationDate(), 'Fecha de expiración');
    InputValidator.isNotEmpty(food.getQuantity(), 'Cantidad');

    if (new Date(food.getExpirationDate()) < new Date())
      throw CustomException.businessRule(
        'La fecha de expiración no puede ser anterior a hoy.'
      );

    if (food.getQuantity() <= 0)
      throw CustomException.businessRule('La cantidad debe ser mayor a cero.');

    if (!Object.values(FoodStatus).includes(food.getStatus() as FoodStatus))
      throw CustomException.businessRule(`Estatus inválido. Debe ser uno de:
        ${Object.values(FoodStatus).join(', ')}`);
  }

  private async ensureNameIsUnique(name: string) {
    const exists = await this.foodRepository.findFoodByName(name);
    if (exists)
      throw CustomException.businessRule(
        'Ya existe un alimento con ese nombre.'
      );
  }
}
