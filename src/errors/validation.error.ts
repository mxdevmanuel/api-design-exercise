import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from 'zod';
import { BaseError } from './error';

export class ValidationError implements BaseError {
  name = 'ValidationError';
  statusCode = StatusCodes.BAD_REQUEST;
  statusMessage = ReasonPhrases.BAD_REQUEST;
  issues: string[];

  get message(): string {
    return this.issues.join(', ');
  }

  constructor(error: ZodError) {
    this.issues = error.issues.map(
      ({ message, path }: ZodIssue) => `${path}: ${message}`
    );
  }
}
