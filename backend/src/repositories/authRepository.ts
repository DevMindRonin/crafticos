import { hashPassword, comparePassword } from "@/utils/password";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Context, Role, User } from "@/types";
import { SQL } from "@/constants";

export const listUser = async (email: string, { db }: Context) => {
  try {
    const user = await db.oneOrNone(SQL.GET_USER_BY_EMAIL, [email]);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error reading user");
  }
};

export const register = async (
  _: unknown,
  { email, password, name, role }: User,
  { db }: Context
) => {
  if (!email) {
    throw new Error("Email is required");
  }

  if (typeof role === "undefined") role = Role.USER;
  if (password !== undefined) {
    const hashedPassword = await hashPassword(password);

    const user = await db.one(SQL.REGISTER_USER, [
      email,
      hashedPassword,
      name,
      role,
    ]);

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
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
  { db }: Context
) => {
  try {
    if (!email) throw new Error("Email is required");

    const user = await db.oneOrNone(SQL.LOGIN_USER, [email]);

    console.log("🔍 Found user:", user);
    console.log("🧪 Password field exists?", user?.password !== undefined);
    console.log("🔐 Password value:", user?.password);

    if (!user) {
      console.error("User not found:", email);
      throw new Error("Invalid credentials");
    }

    if (!isGoogleFlow) {
      if (!password) {
        console.error("Password is required for normal login");
        throw new Error("Invalid credentials");
      }

      const valid = await comparePassword(password, user.password);
      console.log("Password valid?", valid);
      if (!valid) {
        console.error("Invalid password for:", email);
        throw new Error("Invalid credentials");
      }
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: Number(process.env.ACCESS_TOKEN_TIME),
      }
    );
    console.log(`Token from frontend: ${token}`);
    const userResponse: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return { token, user: userResponse };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
