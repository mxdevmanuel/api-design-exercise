import { PaginationData } from "@/modules/common";
import { User } from '@/entities/User';
import UserRepository from '@/repositories/users';
import { injectable } from 'tsyringe';


@injectable()
export class UserService {
  constructor(public userRepository: UserRepository) {}

  getUsers(options: PaginationData): Promise<User[]> {
    return this.userRepository.list(options);
  }

  async addUser(user: User): Promise<User> {
    return this.userRepository.add(user);
  }
}
