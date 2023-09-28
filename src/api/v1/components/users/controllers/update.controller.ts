import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';
import isNil from 'lodash/isNil';

export function update(req: Request, res: Response) {
  const userService = container.resolve(UserService);
  const user = req.body as User;
  userService
    .updateUser(user)
    .then((userId: string | undefined) => {
      if (isNil(userId)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
      } else {
        return userService.getUser(userId);
      }
    })
    .then((user: User | undefined) => {
      res.status(StatusCodes.OK).json(user);
    });
}
