import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { TicketService } from '@/services';
import { container } from 'tsyringe';
import isNil from 'lodash/isNil';

export function _delete(req: Request, res: Response, next: NextFunction) {
  const ticketService = container.resolve(TicketService);
  ticketService
    .deleteTicket(req.params.id)
    .then((ticketId: string | undefined) => {
      if (isNil(ticketId)) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
      } else {
        res.json({removed: ticketId});
      }
    })
    .catch(next);
}
