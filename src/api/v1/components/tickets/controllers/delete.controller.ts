import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TicketService } from '@/services';
import { container } from 'tsyringe';

export function _delete(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  ticketService
    .deleteTicket(req.params.id)
    .then(() => {
      res.sendStatus(StatusCodes.NO_CONTENT);
    })
    .catch(next);
}
