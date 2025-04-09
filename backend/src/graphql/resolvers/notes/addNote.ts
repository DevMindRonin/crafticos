import { Context } from "@/types";
import { create } from "@/repositories/notesRepository";

export const addNote = async (
  _: unknown,
  { text }: { text: string },
  context: Context
) => {
  return create(text, context);
};
