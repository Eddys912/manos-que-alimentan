import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../domain/services/AuthService';

export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *  Handles user login.
   * @route POST /auth/login
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const token = await this.authService.login(email, password);

      res.status(200).json({
        message: 'Inicio de sesión exitoso',
        token,
      });
    } catch (error: any) {
      next(error);
    }
  }
}
