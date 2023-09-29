import { Request, TYPES } from 'tedious';
import { SQLServerConnection } from '@/repositories/database';
import { Ticket } from '@/entities/Ticket';
import { TicketDatabase } from './ticketsdatabase';
import { injectable } from 'tsyringe';

@injectable()
export class SQLServerTicketDatabase implements TicketDatabase {
  constructor(
    private dbRepository: SQLServerConnection
  ) {}
  remove(id: string): Promise<string | undefined> {
    console.log('id', id);
    throw new Error('Method not implemented.');
  }
  update(id: string, user: Partial<Ticket>): Promise<string | undefined> {
    console.log("update id", id);
    console.log("update user", user);
    throw new Error('Method not implemented.');
  }
  get(id: string): Promise<Ticket | undefined> {
    console.log('id', id);
    throw new Error('Method not implemented.');
  }
  all(): Promise<Ticket[]> {
    return new Promise<Ticket[]>((resolve, reject) => {
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
  add(user: Ticket): Promise<Ticket> {
    return new Promise<Ticket>((resolve, reject) => {
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
        request.addParameter('nameVal', TYPES.VarChar, user.title);

        connection.execSql(request);
      });
    });
  }
}
