import { AuthenticatedUser, Context } from "@/types";
import { listUser } from "@/repositories/authRepository";

export const getUserByEmail = async (
  _: unknown,
  { email }: AuthenticatedUser,
  context: Context
) => {
  return listUser(email, context);
};
