import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function update(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  const user = req.body as User;
  userService
    .updateUser(user)
    .then((userId: string) => {
      return userService.getUser(userId);
    })
    .then((user: User) => {
      res.status(StatusCodes.OK).json(user);
    })
    .catch(next);
}
