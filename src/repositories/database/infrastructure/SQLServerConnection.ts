import * as tedious from 'tedious';

import { DatabaseConnection } from './databaseconnection';
import { singleton } from 'tsyringe';

@singleton()
export class SQLServerConnection
  implements DatabaseConnection<tedious.Connection>
{
  static config: tedious.ConnectionConfig = {
    server: 'localhost',
    options: {},
    authentication: {
      type: 'default',
      options: {
        userName: 'test',
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
      this.connection.on('connect', (err) => {
        if (err) {
          reject(err);
        }
        // If no error, then good to go...
        this._isConnected = true;
        resolve(this.connection);
      });

      // Initialize the connection.
      this.connection.connect();
    });
    this.connection.connect();
    return connecting;
  }
  async isConnected() {
    return this._isConnected;
  }

  async getConnection() {
    return this._isConnected ? await this.connect() : this.connection;
  }
  async disconnect() {}
}
