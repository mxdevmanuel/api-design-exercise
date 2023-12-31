import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function create(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  const user = req.body as User;
  userService
    .addUser(user)
    .then((userCreated: User) => {
      res.status(StatusCodes.CREATED).json(userCreated);
    })
    .catch(next);
}
