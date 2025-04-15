import jwt from "jsonwebtoken";
import { User } from "@/types";

export const getUserFromToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
};
