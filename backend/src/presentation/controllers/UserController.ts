import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../domain/services/UserService';
import {
  CreateUserProps,
  UpdateUserProps,
} from '../../domain/interfaces/IUser';
import { UserType } from '../../domain/enums/User.enum';
import { CustomException } from '../../shared/errors/CustomException';

/**
 * Express controller for managing user-related HTTP requests.
 * Delegates operations to the UserService and formats API responses.
 */
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Handles request to create a new employee user.
   * @route POST /users/employee
   */
  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const user: CreateUserProps = req.body;
      const userCreated = await this.userService.createEmployee(user);
      res.status(201).json({
        userCreated,
        message: 'Empleado creado satisfactoriamente',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handles request to create a new client user.
   * @route POST /users/client
   */
  async createClient(req: Request, res: Response, next: NextFunction) {
    try {
      const user: CreateUserProps = req.body;
      const userCreated = await this.userService.createClient(user);
      res.status(201).json({
        userCreated,
        message: 'Cliente creado satisfactoriamente',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates an existing user by ID.
   * @route PUT /users/:id
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const userData: UpdateUserProps = req.body;

      if (!userId || typeof userId !== 'string')
        throw CustomException.validation('ID del usuario es requerido');

      const result = await this.userService.updateUser(userId, userData);
      res
        .status(200)
        .json({ result, message: 'Usuario actualizado satisfactoriamente' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a user by ID.
   * @route DELETE /users/:id
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string')
        throw CustomException.validation('ID del usuario es requerido');

      await this.userService.deleteUser(id);
      res.status(200).json({
        success: true,
        message: 'Usuario eliminado satisfactoriamente',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all users with user type "EMPLOYEE".
   * @route GET /users/employees/all
   */
  async getAllEmployees(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers(UserType.EMPLOYEE);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all users with user type "CLIENT".
   * @route GET /users/clients/all
   */
  async getAllClients(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAllUsers(UserType.CLIENT);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves users based on query filters.
   * @route GET /users/filter
   */
  async getUsersByFilter(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        name: req.query.name?.toString().toLowerCase() || null,
        email: req.query.email?.toString().toLowerCase() || null,
        role: req.query.role?.toString().toLowerCase() || null,
        status: req.query.status?.toString().toLowerCase() || null,
      };

      const hasFilters = Object.values(filters).some((value) => value !== null);

      if (!hasFilters)
        throw CustomException.validation(
          'Debe proporcionar al menos un filtro de búsqueda'
        );

      const users = await this.userService.getUsersByFilter(filters);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a user by their ID.
   * @route GET /users/:id
   */
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!id || typeof id !== 'string')
        throw CustomException.validation('ID del usuario es requerido');

      const user = await this.userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
