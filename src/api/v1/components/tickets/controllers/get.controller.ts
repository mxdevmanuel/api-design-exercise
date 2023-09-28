import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';
import isNil from 'lodash/isNil';

export function get(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  ticketService
    .getTicket(req.params.id)
    .then((ticket: Ticket | undefined) => {
      if (isNil(ticket)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
      } else {
        res.json(ticket);
      }
    })
    .catch(next);
}
