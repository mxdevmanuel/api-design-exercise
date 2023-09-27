import { PaginationData } from "@/modules/common";
import { User } from "@/entities";

export interface UserDatabase {
    add(user: User): Promise<User>;
    all(options: PaginationData): Promise<User[]>;
    get(id: string): Promise<User | undefined>;
}