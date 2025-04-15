export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface AuthenticatedUser {
  email: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  password?: string;
}
