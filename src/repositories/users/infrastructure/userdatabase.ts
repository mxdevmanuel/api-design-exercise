import { User } from "@/entities/User";

export interface UserDatabase {
    add(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}