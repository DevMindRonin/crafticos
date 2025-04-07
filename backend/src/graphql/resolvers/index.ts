import { addNote } from "./notes/addNote";
import { deleteNote } from "./notes/deleteNote";
import { getNoteById } from "./notes/getNoteById";
import { getNotes } from "./notes/getNotes";
import { updateNote } from "./notes/updateNote";

import { getUserByEmail } from "./users/getUserByEmail";

export const resolvers = {
  Query: {
    getNotes,
    getNoteById,
    getUserByEmail,
  },
  Mutation: {
    addNote,
    updateNote,
    deleteNote,
  },
};
