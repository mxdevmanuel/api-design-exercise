import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function get(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  userService
    .getUser(req.params.id)
    .then((user: User | undefined) => {
      res.status(StatusCodes.OK).json(user);
    })
    .catch(next);
}
