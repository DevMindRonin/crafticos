export const user = async (
  _: unknown,
  { email }: { email: string },
  { db }: { db: any },
) => {
  return db.oneOrNone(
    `SELECT id, email, name, role
           FROM "users"
           WHERE email = $1`,
    [email],
  );
};
