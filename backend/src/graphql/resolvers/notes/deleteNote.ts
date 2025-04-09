import { Context } from "@/types";
import { remove } from "@/repositories/notesRepository";

export const deleteNote = async (
  _: unknown,
  { id }: { id: string },
  context: Context
) => {
  try {
    const result = await remove(id, context);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting note");
  }
};
