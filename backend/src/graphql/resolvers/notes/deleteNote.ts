import { Context } from "@/types";
import { remove } from "@/repositories/notesRepository";

export const deleteNote = async (
  _: unknown,
  { id }: { id: string },
  context: Context
) => {
  try {
    const result = await remove(id, context);
    console.log(`Resolver calling for remove with result: ${result}`);
    return { id: result };
  } catch (error) {
    console.error("Error in deleteNote resolver:", error);
    throw error;
  }
};
