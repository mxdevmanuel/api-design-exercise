import { RequestHandler } from 'express';
import { ValidationError } from '@/errors';
import { z } from 'zod';

export const unassignValidator: RequestHandler = (req, res, next) => {
  const getTicketSchema = z.object({
    id: z.string()
  });

  const urlParams = req.params;
  const zodResult = getTicketSchema.safeParse(urlParams);

  if (zodResult.success) {
    next();
  } else {
    next(new ValidationError(zodResult.error));
  }
};
