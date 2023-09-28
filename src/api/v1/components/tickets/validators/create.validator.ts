import { RequestHandler } from 'express';
import { z } from 'zod';

export const createValidator: RequestHandler = (req, res, next) => {
  const createTicketSchema = z.object({
    title: z.string().max(30),
    assigneeId: z.string().max(10).optional()
  });
  const ticketData = req.body;
  const zodResult = createTicketSchema.safeParse(ticketData);

  if (zodResult.success) {
    req.body = zodResult.data;
    next();
  } else {
    next(zodResult.error);
  }
};
