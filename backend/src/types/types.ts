export interface Data {
  id: number;
  text: string;
}

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface DbClient {
  oneOrNone: (query: string, values?: any[]) => Promise<any>;
  query: (query: string, values?: any[]) => Promise<any>;
}

export interface AuthenticatedUser {
  email: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  password: string;
}
