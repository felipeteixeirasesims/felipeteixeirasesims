class AppError {

  public validation: string;

  public readonly code: string;

  public readonly message: string;

  public readonly path: string[];

  public readonly statusCode: number;

  public name: string;

  public readonly level: string;

  public readonly timestamp: Date;

  constructor(code: string, message: string, statusCode: number = 400, validation: string = "business_rule",
  path: string[] = [], name: string = "AppError", level: string = "error", timestamp?: Date) {
    this.validation = validation;
    this.code = code;
    this.message = message;
    this.path = path;
    this.statusCode = statusCode;
    this.name = name;
    this.level = level;
    this.timestamp = timestamp;
  }
}

export default AppError;
