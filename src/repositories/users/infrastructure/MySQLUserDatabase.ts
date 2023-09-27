import { inject, injectable } from 'tsyringe';
import { MYSQLCONNECTION } from '@/config/constants';
import { MySQLConnection } from '@/repositories/database';
import { PaginationData } from '@/modules/common';
import { User } from '@/entities/User';
import { UserDatabase } from './userdatabase'
import isNil from "lodash/isNil";



@injectable()
export class MySQLUserDatabase implements UserDatabase {
  constructor(@inject(MYSQLCONNECTION) private dbRepository: MySQLConnection) {}
  all(options: PaginationData): Promise<User[]> {
    const page = isNil(options.page) ? 0 : options.page
    const size = isNil(options.size) ? 50 : options.size
    return new Promise<User[]>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        connection.query(`SELECT id, name FROM Users LIMIT ${size} OFFSET ${size * page}`, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(Array.from(rows));
          }
        });
      });
    });
  }
  add(user: User): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const sql = `INSERT INTO Users (id, name) VALUES ('${user.id}', '${user.name}')`;
        connection.query(sql, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
    });
  }
}
