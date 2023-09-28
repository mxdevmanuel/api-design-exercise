import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserService } from '@/services';
import { container } from 'tsyringe';
import isNil from 'lodash/isNil';

export function _delete(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  userService
    .deleteUser(req.params.id)
    .then((userId: string | undefined) => {
      if (isNil(userId)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
      } else {
        res.json({removed: userId});
      }
    })
    .catch(next);
}
