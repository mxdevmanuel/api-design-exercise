import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';

export function unassign(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  const ticketId: string = req.params.id;
  ticketService
    .unassignTicket(ticketId)
    .then((ticketId: string) => {
      return ticketService.getTicket(ticketId);
    })
    .then((ticket: Ticket | undefined) => {
      res.status(StatusCodes.OK).json(ticket);
    })
    .catch(next);
}
