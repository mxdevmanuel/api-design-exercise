import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';
import isNil from 'lodash/isNil';

export function get(req: Request, res: Response) {
  const userService = container.resolve(UserService);
  userService
    .getUser(req.params.id)
    .then((user: User | undefined) => {
      if (isNil(user)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
      } else {
        res.json(user);
      }
    })
    .catch(console.error);
}
