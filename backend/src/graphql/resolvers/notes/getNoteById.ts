import { Context } from "@/types";
import { findById } from "@/repositories/notesRepository";

export const getNoteById = async (
  _: unknown,
  { id }: { id: string },
  context: Context
) => {
  const note = await findById(id, context);
  return note;
};
