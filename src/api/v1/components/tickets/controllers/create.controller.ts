import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';

export function create(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  const ticket = req.body as Ticket;
  ticketService
    .addTicket(ticket)
    .then(() => {
      res.sendStatus(StatusCodes.CREATED);
    })
    .catch(next);
}
