import { MySQLConnection } from '@/repositories/database';
import { PaginationData } from '@/modules/common';
import { User } from '@/entities/User';
import { UserRepository } from './userrepository';
import {  injectable } from 'tsyringe';
import isNil from 'lodash/isNil';

@injectable()
export class MySQLUserRepository implements UserRepository {
  constructor(private dbRepository: MySQLConnection) {}
  all(options: PaginationData): Promise<User[]> {
    const page = isNil(options.page) ? 0 : options.page;
    const size = isNil(options.size) ? 50 : options.size;
    return new Promise<User[]>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        connection.query(
          `SELECT id, name FROM Users LIMIT ${size} OFFSET ${size * page}`,
          (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(Array.from(rows));
            }
          }
        );
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
  get(id: string): Promise<User | undefined> {
    return new Promise<User | undefined>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const sql = `SELECT u.id, u.name FROM Users u WHERE u.id  = '${id}' LIMIT 1`;
        connection.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows[0]);
          }
        });
      });
    });
  }
  update(id: string, user: Partial<User>): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const updateString: string = Object.keys(user)
          .map((key) => `${key} =  ?`)
          .join(', ');
        const sql = `UPDATE Users SET ${updateString} WHERE id  = '${id}'`;
        connection.query(sql, Object.values(user), (err, result) => {
          if (err) {
            reject(err);
          } else {
            const rest = result.affectedRows > 0 ? id : undefined;
            resolve(rest);
          }
        });
      });
    });
  }
  remove(id: string): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const sql = `DELETE FROM Users WHERE id = '${id}'`;
        connection.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            const rest = result.affectedRows > 0 ? id : undefined;
            resolve(rest);
          }
        });
      });
    });
  }
}
