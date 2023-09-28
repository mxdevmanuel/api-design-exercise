import { inject, injectable } from 'tsyringe';
import { PaginationData } from '@/modules/common';
import { TICKETREPOSITORY } from '@/config/constants';
import { Ticket } from '@/entities';
import { TicketRepository } from '@/repositories/tickets';
import shortid from "shortid";

@injectable()
export class TicketService {
  constructor(@inject(TICKETREPOSITORY) private ticketRepository: TicketRepository) {}

  getTicket(id: string): Promise<Ticket | undefined> {
    return this.ticketRepository.get(id);
  }

  getTickets(options: PaginationData): Promise<Ticket[]> {
    return this.ticketRepository.all(options);
  }

  addTicket(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    const userToBe = {...ticket, id: shortid.generate()} as Ticket;
    return this.ticketRepository.add(userToBe);
  }

  updateTicket(ticket: Ticket): Promise<string | undefined> {
    const { id, ...rest } = ticket;
    return this.ticketRepository.update(id, rest);
  }

  deleteTicket(id: string): Promise<string | undefined> {
    return this.ticketRepository.remove(id);
  }
}
