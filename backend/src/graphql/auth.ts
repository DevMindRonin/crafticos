import jwt from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    // Ověření tokenu a vrácení payloadu
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return null;
  }
};
