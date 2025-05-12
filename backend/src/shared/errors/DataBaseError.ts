import { GlobalError } from './GlobalError';

/**
 * Enum representing various types of database constraint and connection errors.
 */
export enum DatabaseErrorType {
  GENERAL = 'DB_ERROR',
  UNIQUE = 'UNIQUE_CONSTRAINT_ERROR',
  FOREIGN_KEY = 'FOREIGN_KEY_CONSTRAINT_ERROR',
  ENUM = 'ENUM_VIOLATION_ERROR',
  NOT_NULL = 'NOT_NULL_VIOLATION_ERROR',
  CONNECTION = 'CONNECTION_ERROR',
}

/**
 * Represents low-level database-related errors such as constraint violations
 * or connection issues. Typically thrown from repository or infrastructure layers.
 *
 * @class
 * @extends GlobalError
 */
export class DatabaseError extends GlobalError {
  /**
   * Specific database error code.
   */
  public readonly code: DatabaseErrorType;

  /**
   * Affected column name (if available).
   */
  public readonly column?: string;

  /**
   * @constructor
   * @param {string} message - Description of the error.
   * @param {DatabaseErrorType} code - Enum code categorizing the DB error.
   * @param {string} [column] - Column name that caused the error (optional).
   */
  private constructor(
    message: string,
    code: DatabaseErrorType,
    column?: string
  ) {
    super(message, 500);
    this.code = code;
    this.column = column;
  }

  /**
   * Creates a generic database error.
   *
   * @param {string} message - Error message.
   * @returns {DatabaseError} A general database error.
   */
  static general(message: string): DatabaseError {
    return new DatabaseError(message, DatabaseErrorType.GENERAL);
  }

  /**
   * Creates a UNIQUE constraint violation error.
   *
   * @param {string} message - Error message.
   * @returns {DatabaseError} A unique constraint error.
   */
  static unique(message: string): DatabaseError {
    return new DatabaseError(message, DatabaseErrorType.UNIQUE);
  }

  /**
   * Creates a FOREIGN KEY constraint violation error.
   *
   * @param {string} message - Error message.
   * @returns {DatabaseError} A foreign key constraint error.
   */
  static foreignKey(message: string): DatabaseError {
    return new DatabaseError(message, DatabaseErrorType.FOREIGN_KEY);
  }

  /**
   * Creates an ENUM or CHECK constraint violation error.
   *
   * @param {string} message - Error message.
   * @returns {DatabaseError} An enum violation error.
   */
  static enumViolation(message: string): DatabaseError {
    return new DatabaseError(message, DatabaseErrorType.ENUM);
  }

  /**
   * Creates a NOT NULL constraint violation error.
   *
   * @param {string} message - Error message.
   * @param {string} [column] - Column name that caused the violation.
   * @returns {DatabaseError} A not-null constraint error.
   */
  static notNull(message: string, column?: string): DatabaseError {
    return new DatabaseError(message, DatabaseErrorType.NOT_NULL, column);
  }

  /**
   * Creates a database connection error.
   *
   * @param {string} message - Error message.
   * @returns {DatabaseError} A connection error.
   */
  static connection(message: string): DatabaseError {
    return new DatabaseError(message, DatabaseErrorType.CONNECTION);
  }
}
