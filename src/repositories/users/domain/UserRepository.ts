import { inject, injectable } from 'tsyringe';

import { PaginationData } from "@/modules/common";
import { USERDATABASE } from '@/config/constants';
import { User } from '@/entities/User';
import { UserDatabase } from '../infrastructure/userdatabase';

@injectable()
export class UserRepository {
  constructor(@inject(USERDATABASE) private userdatabase: UserDatabase) {}

  async add(user: User): Promise<User> {
    return await this.userdatabase.add(user);
  }

  async list(options: PaginationData): Promise<User[]> {
    return await this.userdatabase.all(options);
  }
}
