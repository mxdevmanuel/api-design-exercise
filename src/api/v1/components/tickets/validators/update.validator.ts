import { RequestHandler } from 'express';
import { z } from 'zod';

export const updateValidator: RequestHandler = (req, res, next) => {
  const updateTicketSchema = z.object({
    id: z.string().max(10),
    title: z.string().max(30).optional()
  });
  const ticketData = { id: req.params.id, ...req.body };
  const zodResult = updateTicketSchema.safeParse(ticketData);

  if (zodResult.success) {
    req.body = zodResult.data;
    next();
  } else {
    next(zodResult.error);
  }
};
