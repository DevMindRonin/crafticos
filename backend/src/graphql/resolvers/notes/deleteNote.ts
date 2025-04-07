import { Context } from "@/types";

export const deleteNote = async (
  _: unknown,
  { id }: { id: string },
  { db, user }: Context
) => {
  if (!user) throw new Error("Not authenticated");
  try {
    const result = await db.result("DELETE FROM notes WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting note");
  }
};
