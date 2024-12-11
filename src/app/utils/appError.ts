export class AppError extends Error {
  public readonly status: number;
  public readonly isOperational: boolean;

  constructor(message: string, status: number, isOperational = true) {
    super(message);
    this.status = status;
    this.isOperational = isOperational;

    // Maintain proper stack trace (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
