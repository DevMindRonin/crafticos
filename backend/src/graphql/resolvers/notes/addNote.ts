import { Context } from "@/types";
import { add } from "@/repositories/notesRepository";

export const addNote = async (
  _: unknown,
  { text }: { text: string },
  context: Context
) => {
  return add(text, context);
};
