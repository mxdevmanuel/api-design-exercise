import { Request, TYPES } from 'tedious';

import { inject, injectable } from 'tsyringe';
import { SQLSERVERCONNECTION } from '@/config/constants';
import { SQLServerConnection } from '@/repositories/database';
import { User } from '@/entities/User';
import { UserDatabase } from './userdatabase';

@injectable()
export class SQLServerUserDatabase implements UserDatabase {
  constructor(
    @inject(SQLSERVERCONNECTION) private dbRepository: SQLServerConnection
  ) {}
  get(id: string): Promise<User | undefined> {
    console.log('id', id);
    throw new Error('Method not implemented.');
  }
  all(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const request = new Request(
          'SELECT id, name FROM Users',
          (err, rowCount, rows) => {
            if (err) {
              reject(err);
            } else {
              console.log('rowCount', rowCount);
              console.log('rows', rows);
              resolve([]);
            }
          }
        );

        connection.execSql(request);
      });
    });
  }
  add(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const sql = `INSERT INTO User (id, name) VALUES (@idVal, @nameVal)`;
        const request = new Request(sql, (err, rowCount, rows) => {
          console.error('err', err);
          if (err) {
            reject(err);
          } else {
            console.log('rowCount', rowCount);
            console.log('rows', rows);
            resolve(user);
          }
        });

        // Setting values to the variables. Note: first argument matches name of variable above.
        request.addParameter('idVal', TYPES.VarChar, user.id);
        request.addParameter('nameVal', TYPES.VarChar, user.name);

        connection.execSql(request);
      });
    });
  }
}
