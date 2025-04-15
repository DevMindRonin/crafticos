import { Context } from "@/types";
import { removeUser } from "@/repositories/authRepository";

export const deleteUser = async (
  _: unknown,
  { id }: { id: string },
  context: Context
): Promise<Boolean> => {
  if (!context.user) throw new Error("Not authenticated");
  try {
    return await removeUser(id, context);
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting user");
  }
};
