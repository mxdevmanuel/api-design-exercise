import { PaginationData } from "@/modules/common";
import { Ticket } from "@/entities";

export interface TicketDatabase {
    add(Ticket: Ticket): Promise<Ticket>;
    all(options: PaginationData): Promise<Ticket[]>;
    get(id: string): Promise<Ticket | undefined>;
    update(id: string, user: Partial<Ticket>): Promise<string | undefined>
    remove(id: string): Promise<string | undefined>
}