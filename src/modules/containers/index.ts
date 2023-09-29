import * as constants from '@/config/constants';
import { MySQLTicketRepository } from '@/repositories/tickets';
import { MySQLUserRepository } from '@/repositories/users';
import { container } from 'tsyringe';

container.register(constants.USERREPOSITORY, { useClass: MySQLUserRepository });
container.register(constants.TICKETREPOSITORY, { useClass: MySQLTicketRepository });

export function setup() {
  return container;
}
