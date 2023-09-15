export interface DatabaseConnection<T> {
  connect: () => Promise<T>;
  isConnected: () => Promise<boolean>;
  getConnection: () => Promise<T>;
  disconnect: () => Promise<void>;
}
