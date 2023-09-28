import { RequestHandler } from 'express';
import { z } from 'zod';

export const getValidator: RequestHandler = (req, res, next) => {
  const getTicketSchema = z.object({
    id: z.string()
  });

  const urlParams = req.params;
  const zodResult = getTicketSchema.safeParse(urlParams);

  if (zodResult.success) {
    next();
  } else {
    next(zodResult.error);
  }
};
