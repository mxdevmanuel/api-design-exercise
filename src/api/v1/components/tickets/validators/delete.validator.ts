import { RequestHandler } from 'express';
import { ValidationError } from '@/errors';
import { z } from 'zod';

export const deleteValidator: RequestHandler = (req, res, next) => {
  const deleteTicketSchema = z.object({
    id: z.string()
  });

  const urlParams = req.params;
  const zodResult = deleteTicketSchema.safeParse(urlParams);

  if (zodResult.success) {
    next();
  } else {
    next(new ValidationError(zodResult.error));
  }
};
