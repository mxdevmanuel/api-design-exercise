import { RequestHandler } from 'express';
import { ValidationError } from '@/errors';
import { z } from 'zod';

export const deleteValidator: RequestHandler = (req, res, next) => {
  const deleteUserSchema = z.object({
    id: z.string()
  });

  const urlParams = req.params;
  const zodResult = deleteUserSchema.safeParse(urlParams);

  if (zodResult.success) {
    next();
  } else {
    next(new ValidationError(zodResult.error));
  }
};
