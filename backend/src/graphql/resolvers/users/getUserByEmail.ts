import { AuthenticatedUser } from "@/types/user.types";
import { DbClient } from "@/types/db.types";

export const getUserByEmail = async (
  _: unknown,
  { email }: AuthenticatedUser,
  { db }: { db: DbClient },
) => {
  return db.oneOrNone(
    `SELECT id, email, name, role
           FROM "users"
           WHERE email = $1`,
    [email],
  );
};
