import { Request, Response, NextFunction } from 'express';
import { GlobalError } from '../errors/GlobalError';
import { CustomException } from '../errors/CustomException';
import { DatabaseError } from '../errors/DataBaseError';

/**
 * Global Express error handler middleware.
 *
 * @param err - Any error thrown during request lifecycle.
 * @param _req - Express Request object (unused).
 * @param res - Express Response object.
 * @param _next - Express NextFunction (unused).
 * @returns Express Response with formatted JSON error.
 */
export const errorHandler: (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void = (err, _req, res, _next) => {
  if (err instanceof GlobalError) {
    return res.status(err.statusCode).json({
      message: err.message,
      code: err.statusCode,
      type:
        err instanceof CustomException
          ? err.type
          : err instanceof DatabaseError
          ? err.code
          : 'UNKNOWN_ERROR',
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
    code: 500,
    type: 'UNHANDLED_EXCEPTION',
  });
};
