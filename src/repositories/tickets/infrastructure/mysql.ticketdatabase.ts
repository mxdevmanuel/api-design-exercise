import { inject, injectable } from 'tsyringe';
import { MYSQLCONNECTION } from '@/config/constants';
import { MySQLConnection } from '@/repositories/database';
import { PaginationData } from '@/modules/common';
import { Ticket } from '@/entities';
import { TicketDatabase } from './ticketsdatabase';
import isNil from 'lodash/isNil';

@injectable()
export class MySQLTicketDatabase implements TicketDatabase {
  constructor(@inject(MYSQLCONNECTION) private dbRepository: MySQLConnection) {}
  all(options: PaginationData): Promise<Ticket[]> {
    const page = isNil(options.page) ? 0 : options.page;
    const size = isNil(options.size) ? 50 : options.size;
    return new Promise<Ticket[]>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        connection.query(
          `SELECT id, title, assigneeId FROM Tickets LIMIT ${size} OFFSET ${
            size * page
          }`,
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
  add(ticket: Partial<Ticket>): Promise<Ticket> {
    return new Promise<Ticket>((resolve, reject) => {
      const entries = Object.entries(ticket);
      const fields = entries.map((entry) => entry[0]).join(', ');
      const values = entries.map((entry) => entry[1]);
      this.dbRepository.getConnection().then((connection) => {
        const sql = `INSERT INTO Tickets (${fields}) VALUES (?)`;
        connection.query(sql, [values], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(ticket as Ticket);
          }
        });
      });
    });
  }
  get(id: string): Promise<Ticket | undefined> {
    return new Promise<Ticket | undefined>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const sql = `SELECT t.id, t.title, t.assigneeId FROM Tickets t WHERE t.id  = '${id}' LIMIT 1`;
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
  update(id: string, ticket: Partial<Ticket>): Promise<string | undefined> {
    return new Promise<string | undefined>((resolve, reject) => {
      this.dbRepository.getConnection().then((connection) => {
        const updateString: string = Object.keys(ticket)
          .map((key) => `${key} =  ?`)
          .join(', ');
        const sql = `UPDATE Tickets SET ${updateString} WHERE id  = '${id}'`;
        connection.query(sql, Object.values(ticket), (err, result) => {
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
        const sql = `DELETE FROM Tickets WHERE id = '${id}'`;
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
