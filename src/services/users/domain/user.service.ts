import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '@/errors';
import { PaginationData } from '@/modules/common';
import { USERREPOSITORY } from '@/config/constants';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/users';
import isNil from 'lodash/isNil';
import shortid from 'shortid';

@injectable()
export class UserService {
  constructor(@inject(USERREPOSITORY) private userRepository: UserRepository) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.get(id);
    if (isNil(user))
      throw new NotFoundError([`User with id '${id}' not found`]);
    return user;
  }

  getUsers(options: PaginationData): Promise<User[]> {
    return this.userRepository.all(options);
  }

  addUser(user: Omit<User, 'id'>): Promise<User> {
    const userToBe = { ...user, id: shortid.generate() } as User;
    return this.userRepository.add(userToBe);
  }

  async updateUser(user: User): Promise<string> {
    const { id, ...rest } = user;
    const userId = await this.userRepository.update(id, rest);
    if (isNil(userId))
      throw new NotFoundError([`User with id '${id}' not found`]);
    return userId;
  }

  async deleteUser(id: string): Promise<string> {
    const userId = await this.userRepository.remove(id);
    if (isNil(userId))
      throw new NotFoundError([`User with id '${id}' not found`]);
    return userId;
  }
}
