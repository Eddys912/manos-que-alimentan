import { Router } from 'express';
import { foodController } from '../controllers/foodController';

const routerFood = Router();

routerFood.get('/', foodController.findAllFoods);
routerFood.get('/', foodController.findFoodsByFilter);
routerFood.post('/', foodController.createFood);
routerFood.put('/:id', foodController.updateFood);
routerFood.delete('/:id', foodController.deleteFood);

export default routerFood;
