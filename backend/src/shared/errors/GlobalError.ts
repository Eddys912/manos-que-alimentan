/**
 * Abstract base class for all custom application errors.
 *
 * All domain, validation, and infrastructure errors should extend this class
 * to maintain consistency and allow centralized error handling.
 *
 * @class
 * @extends Error
 */
export class GlobalError extends Error {
  /**
   * The associated HTTP status code.
   */
  public readonly statusCode: number;

  /**
   * Indicates whether the error is operational (expected) or a programming failure.
   */
  public readonly isOperational: boolean;

  /**
   * Creates a new GlobalError instance.
   *
   * @param {string} message - Human-readable error message.
   * @param {number} [statusCode=500] - HTTP status code that represents this error.
   * @param {boolean} [isOperational=true] - Whether this is a trusted (operational) error.
   *
   * @example
   * throw new GlobalError('Internal error occurred', 500);
   */
  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
