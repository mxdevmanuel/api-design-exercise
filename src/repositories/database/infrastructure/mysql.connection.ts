import * as mysql from 'mysql';
import { DatabaseConnection } from './databaseconnection';
import { singleton } from 'tsyringe';

@singleton()
export class MySQLConnection implements DatabaseConnection<mysql.Connection> {
  static config: mysql.ConnectionConfig = {
    host: 'localhost',
    database: 'serverpoc',
    user: 'serverpoc',
    password: 'kMkA]mc9uN@j&Ym'
  };

  private connection = mysql.createConnection(MySQLConnection.config);

  private _isConnected: boolean = false;

  connect() {
    const connecting = new Promise<mysql.Connection>((resolve, reject) => {
      this.connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          this._isConnected = true;
          resolve(this.connection);
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
