import { RequestHandler } from 'express';
import { ValidationError } from '@/errors';
import { z } from 'zod';

export const listValidator: RequestHandler = (req, res, next) => {
  const listTicketsSchema = z
    .object({
      page: z.coerce.number().optional(),
      size: z.coerce.number().optional()
    })
    .optional();

  const paginationData = req.query;
  const zodResult = listTicketsSchema.safeParse(paginationData);

  if (zodResult.success) {
    /* @IMPORTANT NOTE: Body is set to avoid modification of the signature */
    req.body = zodResult.data;
    next();
  } else {
    next(new ValidationError(zodResult.error));
  }
};
