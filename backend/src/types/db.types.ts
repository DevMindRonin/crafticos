export interface DbClient {
  oneOrNone: (query: string, values?: any[]) => Promise<any>;
  query: (query: string, values?: any[]) => Promise<any>;
}
