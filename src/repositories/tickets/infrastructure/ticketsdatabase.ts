import { PaginationData } from '@/modules/common';
import { Ticket } from '@/entities';
import { TicketSearch } from '../domain/ticket.search';

export interface TicketDatabase {
  add(ticket: Ticket): Promise<Ticket>;
  all(options: PaginationData): Promise<Ticket[]>;
  find(searchCriteria: TicketSearch): Promise<Ticket[]>;
  get(id: string): Promise<Ticket | undefined>;
  remove(id: string): Promise<string | undefined>;
  update(id: string, ticket: Partial<Ticket>): Promise<string | undefined>;
}
