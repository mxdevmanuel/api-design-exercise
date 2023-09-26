import * as tedious from 'tedious';

import { DatabaseConnection } from './databaseconnection';
import { singleton } from 'tsyringe';

@singleton()
export class SQLServerConnection
  implements DatabaseConnection<tedious.Connection>
{
  static config: tedious.ConnectionConfig = {
    server: 'localhost',
    options: {
      database: 'SQLServerPOC'
    },
    authentication: {
      type: 'default',
      options: {
        userName: 'sqlserverproc',
        password: 'test'
      }
    }
  };

  private connection: tedious.Connection = new tedious.Connection(
    SQLServerConnection.config
  );

  private _isConnected: boolean = false;

  connect() {
    const connecting = new Promise<tedious.Connection>((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          // If no error, then good to go...
          // console.log(this.connection['state']);
          // setInterval(() => {
            // if (this.connection.state === this.connection.STATE.LOGGED_IN) {
            this._isConnected = true;
            resolve(this.connection);
            // }
          // }, 1000);
        }
      });
    });
    return connecting;
  }
  async isConnected() {
    return this._isConnected;
  }

  async getConnection() {
    return this._isConnected ? this.connection : await this.connect();
  }
  async disconnect() {}
}
