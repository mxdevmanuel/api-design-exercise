import * as constants from '@/config/constants';
import { MySQLConnection, SQLServerConnection } from '@/repositories/database';
import { MySQLTicketRepository } from '@/repositories/tickets';
import { MySQLUserRepository } from '@/repositories/users';
import { container } from 'tsyringe';

container.register(constants.USERREPOSITORY, { useClass: MySQLUserRepository });
container.register(constants.TICKETREPOSITORY, { useClass: MySQLTicketRepository });

container.register(constants.SQLSERVERCONNECTION, {
  useClass: SQLServerConnection
});
container.register(constants.MYSQLCONNECTION, {
  useClass: MySQLConnection
});

export function setup() {
  return container;
}
