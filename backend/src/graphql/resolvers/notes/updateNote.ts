import { Context } from "@/types";
export const updateNote = async (
  _: unknown,
  { id, text }: { id: string; text: string },
  { db, user }: Context
) => {
  if (!user) throw new Error("Not authenticated");
  try {
    return await db.oneOrNone(
      "UPDATE notes SET text = $1 WHERE id = $2 RETURNING *",
      [text, id]
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error updating note");
  }
};
