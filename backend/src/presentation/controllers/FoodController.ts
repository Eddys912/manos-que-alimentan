import { NextFunction, Request, Response } from 'express';
import { FoodService } from '../../domain/services/FoodService';
import {
  CreateFoodProps,
  UpdateFoodProps,
} from '../../domain/interfaces/IFood';
import { CustomException } from '../../shared/errors/CustomException';

/**
 * Express controller for managing food-related HTTP requests.
 * Delegates operations to the FoodService and formats API responses.
 */
export class FoodController {
  constructor(private foodService: FoodService) {}

  /**
   * Handles request to create a new food.
   * @route POST /foods
   */
  async createFood(req: Request, res: Response, next: NextFunction) {
    try {
      const food: CreateFoodProps = req.body;
      const foodCreated = await this.foodService.createFood(food);
      res.status(201).json({
        foodCreated,
        message: 'Alimento creado satisfactoriamente',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing food by ID.
   * @route PUT /foods/:id
   */
  async updateFood(req: Request, res: Response, next: NextFunction) {
    try {
      const foodId = req.params.id;
      const foodData: UpdateFoodProps = req.body;
      if (!foodId || typeof foodId !== 'string')
        throw CustomException.validation('ID del alimento es requerido');

      const result = await this.foodService.updateFood(foodId, foodData);
      res
        .status(200)
        .json({ result, message: 'Alimento actualizado satisfactoriamente' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a food by ID.
   * @route DELETE /foods/:id
   */
  async deleteFood(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string')
        throw CustomException.validation('ID del alimento es requerido');

      await this.foodService.deleteFood(id);
      res.status(200).json({
        success: true,
        message: 'Alimento eliminado satisfactoriamente',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all foods
   * @route GET /foods/all
   */
  async getAllFoods(_req: Request, res: Response, next: NextFunction) {
    try {
      const foods = await this.foodService.getAllFoods();
      res.status(200).json(foods);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves foods based on query filters.
   * @route GET /foods/filter
   */
  async getFoodsByFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        name: req.query.name?.toString().toLowerCase() || null,
        category: req.query.category?.toString().toLowerCase() || null,
        status: req.query.status?.toString() || null,
      };

      const hasFilters = Object.values(filters).some((value) => value !== null);

      if (!hasFilters)
        throw CustomException.validation(
          'Debe proporcionar al menos un filtro de búsqueda'
        );

      const foods = await this.foodService.getFoodsByFilter(filters);
      res.status(200).json(foods);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a food by their ID.
   * @route GET /foods/:id
   */
  async getFoodById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string')
        throw CustomException.validation('ID del alimento es requerido');

      const food = await this.foodService.getFoodById(id);
      res.status(200).json(food);
    } catch (error) {
      next(error);
    }
  }
}
