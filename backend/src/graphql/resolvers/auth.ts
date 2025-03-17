import { hashPassword, comparePassword } from "../../utils/password";
import jwt from "jsonwebtoken";
import { Role } from "../../types/types";

export const register = async (
  _: unknown,
  {
    email,
    password,
    name,
    role,
  }: { email: string; password: string; name: string; role: Role },
  { db }: any,
) => {
  if (!email || !password || !name) {
    throw new Error("Email, password and name are required");
  }

  if (typeof role === "undefined") role = Role.USER;
  const hashedPassword = await hashPassword(password);

  // Sestavíme SQL dotaz a vložíme nového uživatele
  // a hned si necháme vrátit nově vytvořený záznam
  const user = await db.one(
    `INSERT INTO "users" (email, password, name, role)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, name, role`,
    [email, hashedPassword, name, role],
  );

  // Vytvoříme token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
  );

  return { token, user };
};

export const login = async (
  _: unknown,
  { email, password }: { email: string; password: string },
  { db }: any,
) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Najdeme uživatele v DB
  const user = await db.oneOrNone(
    `SELECT id, email, password, name, role FROM "users" WHERE email = $1`,
    [email],
  );
  if (!user) {
    console.error("Login error: user not found for email:", email);
    throw new Error("Invalid login");
  }

  // Porovnáme heslo
  const valid = await comparePassword(password, user.password);
  if (!valid) {
    console.error("Login error: password invalid for user:", user.email);
    throw new Error("Invalid login");
  }

  // Vytvoříme token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" },
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
