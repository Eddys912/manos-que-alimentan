import { Router } from 'express';
import { UserRepository } from '../../infraestructure/repositories/UserRepository';
import { AuthService } from '../../domain/services/AuthService';
import { AuthController } from '../controllers/AuthController';

/**
 * Express router for logon-related API endpoints.
 * Wires the controller to the service and repository layers using dependency injection.
 */
const routerAuth = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

routerAuth.post('/login', authController.login.bind(authController));

export default routerAuth;
