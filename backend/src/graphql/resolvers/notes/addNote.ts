import { Context } from "@/types";
import { add } from "@/hooks/useNotes";

export const addNote = async (
  _: unknown,
  { text }: { text: string },
  context: Context
) => {
  return add(text, context);
};
