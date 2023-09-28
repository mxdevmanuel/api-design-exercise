
import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Ticket } from '@/entities';
import { TicketService } from '@/services';
import { container } from 'tsyringe';
import isNil from 'lodash/isNil';

export function assign(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  const ticket = req.body as Ticket;
  ticketService
    .updateTicket(ticket)
    .then((ticketId: string | undefined) => {
      if (isNil(ticketId)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
      } else {
        return ticketService.getTicket(ticketId);
      }
    })
    .then((ticket: Ticket | undefined) => {
      res.status(StatusCodes.OK).json(ticket);
    })
    .catch(next);
}
