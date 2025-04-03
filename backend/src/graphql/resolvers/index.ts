import { getNotes } from "./notes/getNotes";
import { getNoteById } from "./notes/getNoteById";
import { addNote } from "./notes/addNote";
import { updateNote } from "./notes/updateNote";
import { deleteNote } from "./notes/deleteNote";
import { register } from "./auth";
import { login } from "./auth";
import { currentUser } from "./users/currentUser";
import { getUserByEmail } from "./users/getUserByEmail";

export const resolvers = {
  Query: {
    getNotes,
    getNoteById,
    currentUser,
    getUserByEmail,
  },
  Mutation: {
    addNote,
    updateNote,
    deleteNote,
    register,
    login,
  },
};
