import { Context, NoteType, User } from "@/types";
import { SQL } from "@/constants";

export const add = async (
  text: string,
  { user, db }: Context
): Promise<NoteType> => {
  if (!user) throw new Error("Not authenticated");
  try {
    const note = await db.one<NoteType>(SQL.ADD_NOTE, [text]);
    return { id: note.id, text: note.text, created_at: note.created_at };
  } catch (error) {
    console.error(error);
    throw new Error("Error adding note");
  }
};

export const remove = async (
  id: string,
  { user, db }: Context
): Promise<boolean> => {
  if (!user) throw new Error("Not authenticated");
  try {
    const result = await db.none(SQL.DELETE_NOTE, [id]);
    return true;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting note");
  }
};
