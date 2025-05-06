export function handleDatabaseError(e: any, operation: string): never {
  if (e.code === '23505')
    throw new Error(`Error de restricción UNIQUE al ${operation}`);

  if (e.code === '23514')
    throw new Error(`Error de restricción CHECK al ${operation}`);

  if (e.code === '22P02')
    throw new Error(`Error de tipo de dato inválido al ${operation}`);

  if (e.code === '28P01')
    throw new Error('Credenciales inválidas al conectar a la base de datos');

  if (e.code === 'ECONNREFUSED')
    throw new Error('No se pudo conectar a la base de datos');

  throw new Error(`Error inesperado al ${operation}: ${e.message}`);
}
