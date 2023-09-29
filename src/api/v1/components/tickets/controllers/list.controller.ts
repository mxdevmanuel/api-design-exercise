import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';

export function list(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  ticketService
    .getTickets({ page: req.body?.page, size: req.body?.size })
    .then((tickets: Ticket[]) => {
      res.status(StatusCodes.OK).json(tickets);
    })
    .catch(next);
}
