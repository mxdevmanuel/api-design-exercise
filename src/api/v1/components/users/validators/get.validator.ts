import { RequestHandler } from 'express';
import { z } from 'zod';

export const getValidator: RequestHandler = (req, res, next) => {
  const getUserSchema = z.object({
    id: z.string()
  });

  const urlParams = req.params;
  const zodResult = getUserSchema.safeParse(urlParams);

  if (zodResult.success) {
    next();
  } else {
    next(zodResult.error);
  }
};
