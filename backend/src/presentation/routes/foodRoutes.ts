import { Router } from 'express';
import { FoodController } from '../controllers/FoodController';
import { FoodService } from '../../domain/services/FoodService';
import { IFoodRepository } from '../../domain/interfaces/IFoodRepository';
import { FoodRepository } from '../../infraestructure/repositories/FoodRepository';

/**
 * Express router for food-related API endpoints.
 * Wires the controller to the service and repository layers using dependency injection.
 */
const routerFood = Router();

const foodRepository: IFoodRepository = new FoodRepository();
const foodService = new FoodService(foodRepository);
const foodController = new FoodController(foodService);

routerFood.get('/all', foodController.getAllFoods.bind(foodController));
routerFood.get('/filter', foodController.getFoodsByFilter.bind(foodController));
routerFood.get('/:id', foodController.getFoodById.bind(foodController));
routerFood.post('/', foodController.createFood.bind(foodController));
routerFood.put('/:id', foodController.updateFood.bind(foodController));
routerFood.delete('/:id', foodController.deleteFood.bind(foodController));

export default routerFood;
