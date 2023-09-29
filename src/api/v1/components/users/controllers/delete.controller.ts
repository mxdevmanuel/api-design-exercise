import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function _delete(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  userService
    .deleteUser(req.params.id)
    .then(() => {
      res.sendStatus(StatusCodes.NO_CONTENT);
    })
    .catch(next);
}
