import { GlobalError } from './GlobalError';

/**
 * Enum representing the various types of business logic errors.
 */
export enum BusinessErrorType {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BUSINESS_RULE = 'BUSINESS_RULE',
}

/**
 * Represents errors related to business logic or domain rules.
 *
 * Typically thrown from services or domain layers when a rule or condition
 * is violated. Extends from the common `GlobalError` base class.
 *
 * @class
 * @extends GlobalError
 */
export class CustomException extends GlobalError {
  /**
   * Type of business error.
   */
  public readonly type: BusinessErrorType;

  /**
   * @constructor
   * @param {string} message - Human-readable error message.
   * @param {number} statusCode - HTTP status code associated with this error.
   * @param {BusinessErrorType} type - Specific type of business error.
   */
  private constructor(
    message: string,
    statusCode: number,
    type: BusinessErrorType
  ) {
    super(message, statusCode, true);
    this.type = type;
  }

  /**
   * Creates a 404 NOT_FOUND error.
   *
   * @param {string} message - Description of the error.
   * @returns {CustomException} A not found exception.
   * @example
   * @throw CustomException.notFound('User not found');
   */
  static notFound(message: string): CustomException {
    return new CustomException(message, 404, BusinessErrorType.NOT_FOUND);
  }

  /**
   * Creates a 400 VALIDATION_FAILED error.
   *
   * @param {string} message - Description of the validation issue.
   * @returns {CustomException} A validation exception.
   * @example
   * @throw CustomException.validation('Email is required');
   */
  static validation(message: string): CustomException {
    return new CustomException(
      message,
      400,
      BusinessErrorType.VALIDATION_FAILED
    );
  }

  /**
   * Creates a 401 UNAUTHORIZED error.
   *
   * @param {string} message - Reason why authentication failed.
   * @returns {CustomException} An unauthorized exception.
   * @example
   * @throw CustomException.unauthorized('Token is invalid');
   */
  static unauthorized(message: string): CustomException {
    return new CustomException(message, 401, BusinessErrorType.UNAUTHORIZED);
  }

  /**
   * Creates a 403 FORBIDDEN error.
   *
   * @param {string} message - Explanation of permission denial.
   * @returns {CustomException} A forbidden exception.
   * @example
   * @throw CustomException.forbidden('Access denied');
   */
  static forbidden(message: string): CustomException {
    return new CustomException(message, 403, BusinessErrorType.FORBIDDEN);
  }

  /**
   * Creates a 409 BUSINESS_RULE violation error.
   *
   * @param {string} message - Description of the business rule violation.
   * @returns {CustomException} A business rule exception.
   * @example
   * @throw CustomException.businessRule('Cannot delete an active user');
   */
  static businessRule(message: string): CustomException {
    return new CustomException(message, 409, BusinessErrorType.BUSINESS_RULE);
  }
}
