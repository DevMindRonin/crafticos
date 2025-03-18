import { getNotes } from "./getNotes";
import { getNoteById } from "./getNoteById";
import { addNote } from "./addNote";
import { updateNote } from "./updateNote";
import { deleteNote } from "./deleteNote";
import { register } from "./auth";
import { login } from "./auth";
import { currentUser } from "./currentUser";
import { getUserByEmail } from "./getUserByEmail";

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
