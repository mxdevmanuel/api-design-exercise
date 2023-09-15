import { inject, injectable } from 'tsyringe';

import { USERDATABASE } from '@/config/constants';
import { User } from '@/entities/User';
import { UserDatabase } from '../infrastructure/userdatabase';

@injectable()
export class UserRepository {
  constructor(@inject(USERDATABASE) private userdatabase: UserDatabase) {}

  async addUser(user: User): Promise<User> {
    return await this.userdatabase.add(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userdatabase.findAll();
  }
}
