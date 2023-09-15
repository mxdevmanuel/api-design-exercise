import * as constants from '@/config/constants';
import { SQLServerConnection } from '@/repositories/database';
import { SQLServerUserDatabase } from '@/repositories/users';
import { container } from 'tsyringe';

export const setup = () => {
  container.register(constants.SQLSERVERCONNECTION, { useClass: SQLServerConnection });
  container.register(constants.USERDATABASE, { useClass: SQLServerUserDatabase });
};
