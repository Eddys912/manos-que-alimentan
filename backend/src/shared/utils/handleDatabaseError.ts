import { DatabaseError } from '../errors/DataBaseError';

/**
 * Handles PostgreSQL specific errors and maps them to domain exceptions
 * @private
 * @param {any} error - The caught PostgreSQL error
 * @param {string} operation - Description of the operation that caused the error
 * @throws {UniqueConstraintError} When a unique constraint is violated
 * @throws {ForeignKeyConstraintError} When a foreign key constraint is violated
 * @throws {NotNullViolationError} When a not-null constraint is violated
 * @throws {EnumViolationError} When an enum value is invalid
 * @throws {ConnectionError} When database connection fails
 * @throws {DatabaseError} For other database errors
 */
export function handlePostgresError(error: any, operation: string): never {
  console.error(`Error en operación "${operation}":`, error);

  switch (error.code) {
    case '23505':
      throw DatabaseError.unique(
        `Violación de restricción única: ${error.constraint || 'unknown'}`
      );

    case '23503':
      throw DatabaseError.foreignKey(
        `Violación de clave foránea: ${error.constraint || 'unknown'}`
      );

    case '23502':
      throw DatabaseError.notNull(
        `Violación de restricción NOT NULL en columna: ${
          error.column || 'unknown'
        }`
      );

    case '23514':
      throw DatabaseError.enumViolation(
        `Violación de restricción CHECK: ${error.constraint || 'unknown'}`
      );

    case '22P02':
      throw DatabaseError.enumViolation(
        `Valor inválido para tipo enumerado: ${error.message}`
      );

    case '08000':
    case '08003':
    case '08006':
    case '08001':
    case '08004':
      throw DatabaseError.connection(`Error de conexión a base de datos`);

    case '22001':
      throw DatabaseError.general(`Valor excede longitud máxima permitida`);

    case '53000':
    case '53100':
    case '53200':
      throw DatabaseError.general(`Recursos insuficientes en BD`);

    case '42P01':
      throw DatabaseError.general(`Tabla no encontrada`);

    case '42703':
      throw DatabaseError.general(`Columna no encontrada`);

    case '42P00':
      throw DatabaseError.general(`Error de sintaxis SQL`);

    default:
      throw DatabaseError.general(`${error.message}`);
  }
}
