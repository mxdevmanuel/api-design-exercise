import { inject, injectable } from 'tsyringe';
import { NotFoundError } from '@/errors';
import { PaginationData } from '@/modules/common';
import { TICKETREPOSITORY } from '@/config/constants';
import { Ticket } from '@/entities';
import { TicketRepository } from '@/repositories/tickets';
import isNil from 'lodash/isNil';
import shortid from 'shortid';

@injectable()
export class TicketService {
  constructor(
    @inject(TICKETREPOSITORY) private ticketRepository: TicketRepository
  ) {}

  async assignTicket(
    ticket: Pick<Ticket, 'id' | 'assigneeId'>
  ): Promise<string> {
    const { id, ...rest } = ticket;
    const ticketId = await this.ticketRepository.update(id, rest);
    if (isNil(ticketId))
      throw new NotFoundError([`Ticket with id '${id}' not found`]);
    return ticketId;
  }

  async getTicket(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.get(id);
    if (isNil(ticket))
      throw new NotFoundError([`Ticket with id '${id}' not found`]);
    return ticket;
  }

  getTickets(options: PaginationData): Promise<Ticket[]> {
    return this.ticketRepository.all(options);
  }

  addTicket(ticket: Omit<Ticket, 'id'>): Promise<Ticket> {
    const userToBe = { ...ticket, id: shortid.generate() } as Ticket;
    return this.ticketRepository.add(userToBe);
  }

  async updateTicket(ticket: Ticket): Promise<string> {
    const { id, ...rest } = ticket;
    const ticketId = await this.ticketRepository.update(id, rest);
    if (isNil(ticketId))
      throw new NotFoundError([`Ticket with id '${id}' not found`]);
    return ticketId;
  }

  async deleteTicket(id: string): Promise<string> {
    const ticketId = await this.ticketRepository.remove(id);
    if (isNil(ticketId))
      throw new NotFoundError([`Ticket with id '${id}' not found`]);
    return ticketId;
  }
}
