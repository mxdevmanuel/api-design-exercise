import { BaseError } from '@/errors';
import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if ('statusCode' in err) {
    const { statusCode, statusMessage, issues }: BaseError = err;
    res.status(statusCode).json({ issues, message: statusMessage });
  } else {
    next(err);
  }
};
