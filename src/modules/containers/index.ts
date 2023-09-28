import * as constants from '@/config/constants';
import { MySQLConnection, SQLServerConnection } from '@/repositories/database';
import { MySQLUserDatabase } from '@/repositories/users';
import { container } from 'tsyringe';

container.register(constants.USERDATABASE, { useClass: MySQLUserDatabase });
container.register(constants.SQLSERVERCONNECTION, {
  useClass: SQLServerConnection
});
container.register(constants.MYSQLCONNECTION, {
  useClass: MySQLConnection
});

export function setup() {
  return container;
}
