import { RequestHandler } from 'express';
import { z } from 'zod';

export const updateValidator: RequestHandler = (req, res, next) => {
  const updateUserSchema = z.object({
    id: z.string().max(10),
    name: z.string().max(30).optional()
  });
  const userData = { id: req.params.id, ...req.body };
  const zodResult = updateUserSchema.safeParse(userData);

  if (zodResult.success) {
    req.body = zodResult.data;
    next();
  } else {
    next(zodResult.error);
  }
};
