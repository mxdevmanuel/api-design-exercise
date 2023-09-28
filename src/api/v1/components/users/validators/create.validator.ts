import { RequestHandler } from 'express';
import { z } from 'zod';

export const createValidator: RequestHandler = (req, res, next) => {
  const createUserSchema = z.object({
    name: z.string().max(30)
  });
  const userData = req.body;
  const zodResult = createUserSchema.safeParse(userData);

  if (zodResult.success) {
    req.body = zodResult.data;
    next();
  } else {
    next(zodResult.error);
  }
};
