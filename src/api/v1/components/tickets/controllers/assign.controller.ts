import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';

export function assign(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  const ticket = req.body as Ticket;
  ticketService
    .assignTicket(ticket)
    .then((ticketId: string) => {
      return ticketService.getTicket(ticketId);
    })
    .then((ticket: Ticket | undefined) => {
      res.status(StatusCodes.OK).json(ticket);
    })
    .catch(next);
}
