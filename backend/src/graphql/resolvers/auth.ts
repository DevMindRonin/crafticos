import { hashPassword, comparePassword } from "@/utils/password";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Context, Role, User } from "@/types";

export const register = async (
  _: unknown,
  { email, password, name, role }: User,
  { db }: Context
) => {
  if (!email || !name) {
    throw new Error("Email and name are required");
  }

  if (typeof role === "undefined") role = Role.USER;
  if (password !== null) {
    const hashedPassword = await hashPassword(password);

    const user: User = await db.one(
      `INSERT INTO "users" (email, password, name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role`,
      [email, hashedPassword, name, role]
    );

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: Number(process.env.ACCESS_TOKEN_TIME) }
    );
    return { token, user };
  } else return { error: "Password is required for normal login" };
};

export const login = async (
  _: unknown,
  {
    email,
    password,
    isGoogleFlow,
  }: { email: string; password?: string; isGoogleFlow?: boolean },
  { db }: any
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  const user: User | null = await db.oneOrNone(
    `SELECT id, email, password, name, role FROM "users" WHERE email = $1`,
    [email]
  );
  if (!user) {
    console.error("Login error: user not found for email:", email);
    throw new Error("Invalid login");
  }

  if (!isGoogleFlow) {
    if (!password) {
      throw new Error("Password is required for normal login");
    }
    if (user.password !== null) {
      const valid = await comparePassword(password, user.password);
      if (!valid) {
        console.error("Login error: password invalid for user:", user.email);
        throw new Error("Invalid login");
      }
    }
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: Number(process.env.ACCESS_TOKEN_TIME) }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};
