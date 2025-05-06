export enum ExceptionType {
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  NOT_FOUND = 'NOT_FOUND',
  DATABASE_ERROR = 'DATABASE_ERROR',
  BUSINESS_RULE = 'BUSINESS_RULE',
  UNKNOWN = 'UNKNOWN',
}

export class CustomException extends Error {
  private type: ExceptionType;

  constructor(type: ExceptionType, message: string) {
    super(message);
    this.type = type;
    Object.setPrototypeOf(this, CustomException.prototype);
  }

  public getType(): ExceptionType {
    return this.type;
  }

  static database(message: string): CustomException {
    return new CustomException(ExceptionType.DATABASE_ERROR, message);
  }

  static validation(message: string): CustomException {
    return new CustomException(ExceptionType.VALIDATION_FAILED, message);
  }

  static businessRule(message: string): CustomException {
    return new CustomException(ExceptionType.BUSINESS_RULE, message);
  }

  static notFound(message: string): CustomException {
    return new CustomException(ExceptionType.NOT_FOUND, message);
  }

  static unknown(message: string): CustomException {
    return new CustomException(ExceptionType.UNKNOWN, message);
  }
}
