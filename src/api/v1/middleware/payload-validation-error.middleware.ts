import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ZodError, ZodIssue } from 'zod';
import { ErrorRequestHandler } from 'express';

type zodDetails = { message: string; path: (string | number)[] };

const zodDetailsExtractor = ({ message, path }: ZodIssue): zodDetails => ({
  message,
  path
});

export const payloadValidationError: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (err instanceof ZodError) {
    const errorList = err.issues.map(zodDetailsExtractor);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ issues: errorList, message: ReasonPhrases.BAD_REQUEST });
  } else {
    next(err);
  }
};
