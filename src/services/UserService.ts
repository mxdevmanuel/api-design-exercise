import { User } from "@/entities/User";
import UserRepository from "@/repositories/users";
import { injectable } from "tsyringe";

@injectable()
export class UserService {
    constructor(public userRepository: UserRepository) { }

    geAllUsers(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }

    async addUser(user: User): Promise<User> {
        return this.userRepository.addUser(user);
    }

}
