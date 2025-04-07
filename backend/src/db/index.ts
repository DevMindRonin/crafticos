import pgPromise from "pg-promise";
import { databaseConfig } from "@/config";
import { IDatabase } from "pg-promise";
import * as pg from "pg-promise/typescript/pg-subset";

const pgp = pgPromise();
const db: IDatabase<pg.IClient> = pgp(databaseConfig);

export default db;
