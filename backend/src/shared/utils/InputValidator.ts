import { CustomException } from './CustomException';

export class InputValidator {
  static isNotEmpty(input: any, fieldName: string): void {
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
}
