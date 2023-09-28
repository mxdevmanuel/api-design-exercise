import { inject, injectable } from 'tsyringe';
import { PaginationData } from '@/modules/common';
import { USERDATABASE } from '@/config/constants';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/users';

@injectable()
export class UserService {
  constructor(@inject(USERDATABASE) private userRepository: UserRepository) {}

  getUser(id: string): Promise<User | undefined> {
    return this.userRepository.get(id);
  }

  getUsers(options: PaginationData): Promise<User[]> {
    return this.userRepository.all(options);
  }

  addUser(user: User): Promise<User> {
    return this.userRepository.add(user);
  }

  updateUser(user: User): Promise<string | undefined> {
    const { id, ...rest } = user;
    return this.userRepository.update(id, rest);
  }
}
