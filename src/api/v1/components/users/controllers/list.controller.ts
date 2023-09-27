import { Request, Response } from 'express';
import { User } from '@/entities';
import { UserService } from '@/services';
import { container } from 'tsyringe';

export function list(_: Request, res: Response) {
  const userService = container.resolve(UserService);
  userService
    .getAllUsers()
    .then((users: User[]) => {
      res.json(users);
    })
    .catch(console.error);
}
