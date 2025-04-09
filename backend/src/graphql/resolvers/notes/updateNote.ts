import { Context } from "@/types";
import { update } from "@/repositories/notesRepository";

export const updateNote = async (
  _: unknown,
  { id, text }: { id: string; text: string },
  context: Context
) => {
  return await update(id, text, context);
};
