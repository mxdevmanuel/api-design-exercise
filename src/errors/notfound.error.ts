import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BaseError } from './error';

export class NotFoundError implements BaseError {
  name = 'NotFoundError';
  statusCode = StatusCodes.NOT_FOUND;
  statusMessage = ReasonPhrases.NOT_FOUND;

  get message() {
    return this.issues.join(', ');
  }

  constructor(public issues: string[]) {}
}
