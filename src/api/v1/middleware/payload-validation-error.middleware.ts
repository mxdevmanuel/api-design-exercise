import { ErrorRequestHandler } from 'express';

export const payloadValidationError: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err.name === 'ZodError') {
    res.status(400).json(err);
  } else {
    next(err);
  }
};
