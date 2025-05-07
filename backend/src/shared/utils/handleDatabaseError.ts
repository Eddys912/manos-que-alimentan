import { CustomException } from './CustomException';

export function handleDatabaseError(e: any, operation: string): never {
  if (e.code === '23505')
    throw CustomException.database(
      `Error de restricción UNIQUE al ${operation}`
    );

  if (e.code === '23514')
    throw CustomException.database(
      `Error de restricción CHECK al ${operation}`
    );

  if (e.code === '22P02')
    throw CustomException.database(
      `Error de tipo de dato inválido al ${operation}`
    );

  if (e.code === '28P01')
    throw CustomException.database(
      'Credenciales inválidas al conectar a la base de datos'
    );

  if (e.code === 'ECONNREFUSED')
    throw CustomException.database('No se pudo conectar a la base de datos');

  throw CustomException.database(
    `Error inesperado al ${operation}: ${e.message}`
  );
}
