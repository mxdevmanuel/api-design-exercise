import { BaseError } from '@/errors';
import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  if ('statusCode' in err) {
    const { statusCode, statusMessage, issues }: BaseError = err;
    res.status(statusCode).json({ issues, message: statusMessage });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ issues: [err.name], message: err.message });
  }
};
