import { findAll } from "@/repositories/notesRepository";
import { Context } from "@/types";

export const getNotes = async (_: unknown, __: unknown, context: Context) => {
  return await findAll(context);
};
