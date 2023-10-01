import { NextFunction, Request, Response } from 'express';
import { Ticket, User } from '@/entities';
import { TicketService, UserService } from '@/services';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

export function list(req: Request, res: Response, next: NextFunction) {
  const userService = container.resolve(UserService);
  const ticketService = container.resolve(TicketService);

  userService
    .getUser(req.params.id)
    .then((user: User) => {
      return ticketService.getTicketsByAssignee({ assigneeId: user.id });
    })
    .then((tickets: Ticket[]) => {
      res.status(StatusCodes.OK).json(tickets);
    })
    .catch(next);
}
