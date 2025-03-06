import { hashPassword, comparePassword } from "../../utils/password";
import jwt from "jsonwebtoken";

export const register = async (
  _: unknown,
  { email, password, name }: { email: string; password: string; name: string },
  { db }: any
) => {
  const hashedPassword = await hashPassword(password);
  const user = await db.user.create({
    data: { email, password: hashedPassword, name },
  });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};

export const login = async (
  _: unknown,
  { email, password }: { email: string; password: string },
  { db }: any
) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid login");

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error("Invalid login");

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return { token, user };
};
