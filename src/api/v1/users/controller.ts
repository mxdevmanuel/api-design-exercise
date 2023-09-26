import { Request, Response } from 'express';
import { User } from '@/entities/User';
import UserRepository from '@/repositories/users';
import { injectable } from 'tsyringe';

@injectable()
export class UserController {
  constructor(private userRepo: UserRepository) {}

  getAll(_: Request, res: Response) {
    this.userRepo
      .findAllUsers()
      .then((users: User[]) => {
        res.json(users);
      })
      .catch(console.error);
  }
}
