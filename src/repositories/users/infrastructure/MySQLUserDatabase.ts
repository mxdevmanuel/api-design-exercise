import { inject, injectable } from 'tsyringe';
import { MYSQLCONNECTION } from '@/config/constants';
import { MySQLConnection } from '@/repositories/database';
import { User } from '@/entities/User';
import { UserDatabase } from './userdatabase';

@injectable()
export class MySQLUserDatabase implements UserDatabase {
  constructor(@inject(MYSQLCONNECTION) private dbRepository: MySQLConnection) {}
  findAll(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        connection.query('SELECT id, name FROM Users', (err, rows) => {
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
