import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';

export function get(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  ticketService
    .getTicket(req.params.id)
    .then((ticket: Ticket) => {
      res.status(StatusCodes.OK).json(ticket);
    })
    .catch(next);
}
