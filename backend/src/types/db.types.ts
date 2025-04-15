import { IDatabase } from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { User } from "./user.types";

export interface Context {
  db: IDatabase<pg.IClient>;
  user: User | null;
}
