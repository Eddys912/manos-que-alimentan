import { Router } from 'express';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { UserService } from '../../domain/services/UserService';
import { UserRepository } from '../../infraestructure/repositories/UserRepository';
import { UserController } from '../controllers/UserController';

/**
 * Express router for user-related API endpoints.
 * Wires the controller to the service and repository layers using dependency injection.
 */
const routerUser = Router();

const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

routerUser.get('/employees/all', userController.getAllEmployees.bind(userController));
routerUser.get('/clients/all', userController.getAllClients.bind(userController));
routerUser.get('/filter', userController.getUsersByFilter.bind(userController));
routerUser.get('/:id', userController.getUserById.bind(userController));
routerUser.post('/employee', userController.createEmployee.bind(userController));
routerUser.post('/client', userController.createClient.bind(userController));
routerUser.put('/:id', userController.updateUser.bind(userController));
routerUser.delete('/:id', userController.deleteUser.bind(userController));

export default routerUser;
