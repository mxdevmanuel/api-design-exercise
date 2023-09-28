import { inject, injectable } from 'tsyringe';
import { PaginationData } from '@/modules/common';
import { USERREPOSITORY } from '@/config/constants';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/users';
import shortid from "shortid";

@injectable()
export class UserService {
  constructor(@inject(USERREPOSITORY) private userRepository: UserRepository) {}

  getUser(id: string): Promise<User | undefined> {
    return this.userRepository.get(id);
  }

  getUsers(options: PaginationData): Promise<User[]> {
    return this.userRepository.all(options);
  }

  addUser(user: Omit<User, 'id'>): Promise<User> {
    const userToBe = {...user, id: shortid.generate()} as User;
    return this.userRepository.add(userToBe);
  }

  updateUser(user: User): Promise<string | undefined> {
    const { id, ...rest } = user;
    return this.userRepository.update(id, rest);
  }

  deleteUser(id: string): Promise<string | undefined> {
    return this.userRepository.remove(id);
  }
}
