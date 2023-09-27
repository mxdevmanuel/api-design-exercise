import { Request, Response } from 'express';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function list(req: Request, res: Response) {
  const userService = container.resolve(UserService);
  userService
    .getUsers({ page: req.body?.page, size: req.body?.size })
    .then((users: User[]) => {
      res.json(users);
    })
    .catch(console.error);
}
