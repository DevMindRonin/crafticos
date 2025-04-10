import {
  updateNote,
  getNotes,
  addNote,
  getNoteById,
  deleteNote,
} from "./notes";

import { getUserByEmail } from "./auth/getUserByEmail";

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
