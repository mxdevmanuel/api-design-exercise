import { RequestHandler } from 'express';
import { z } from 'zod';

export const listValidator: RequestHandler = (req, res, next) => {
  console.log('listValid', req.query);
  const listUsersSchema = z
    .object({
      page: z.coerce.number().optional(),
      size: z.coerce.number().optional()
    })
    .optional();

  const paginationData = req.query;
  const zodResult = listUsersSchema.safeParse(paginationData);

  if (zodResult.success) {
    /* @IMPORTANT NOTE: Body is set to avoid modification of the signature */
    req.body = zodResult.data;
    next();
  } else {
    next(zodResult.error);
  }
};
