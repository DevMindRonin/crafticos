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
  if (!email || !name) {
    throw new Error("Email and name are required");
  }

  // if (!password && !isGoogleFlow) throw Error("Password is require for normal registration")
  //  #zpracuj, Vytvoř proměnnou isGoogleFlow, která bude obsahovat Google přihlašování.

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
  {
    email,
    password,
    isGoogleFlow,
  }: { email: string; password?: string; isGoogleFlow?: boolean },
  { db }: any,
) => {
  if (!email) {
    throw new Error("Email is required");
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

  // Pokud to NENÍ Google login => zkontrolujeme heslo
  if (!isGoogleFlow) {
    if (!password) {
      throw new Error("Password is required for normal login");
    }
    // Porovnáme heslo
    const valid = await comparePassword(password, user.password);
    if (!valid) {
      console.error("Login error: password invalid for user:", user.email);
      throw new Error("Invalid login");
    }
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
