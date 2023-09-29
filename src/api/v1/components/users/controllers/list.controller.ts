import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function list(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  userService
    .getUsers({ page: req.body?.page, size: req.body?.size })
    .then((users: User[]) => {
      res.status(StatusCodes.OK).json(users);
    })
    .catch(next);
}
