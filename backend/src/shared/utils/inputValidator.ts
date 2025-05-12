import { CustomException } from '../errors/CustomException';

/**
 * Validates that a value is not undefined, null, or an empty string.
 *
 * @param {any} input - The value to validate.
 * @param {string} fieldName - The name of the field being validated.
 * @throws {CustomException} If the input is empty or invalid.
 *
 * @example
 * InputValidator.isNotEmpty(name, 'Name');
 */
export function isNotEmpty(input: any, fieldName: string): void {
  if (
    input === undefined ||
    input === null ||
    (typeof input === 'string' && input.trim() === '')
  ) {
    throw CustomException.businessRule(
      'El campo ' + fieldName + ' es requerido'
    );
  }
}
