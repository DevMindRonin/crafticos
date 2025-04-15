import {
  updateNote,
  getNotes,
  addNote,
  getNoteById,
  deleteNote,
} from "./notes";
import { login, register } from "@/repositories/authRepository";
import { getUserByEmail } from "./auth/getUserByEmail";
import { currentUser } from "./auth/currentUser";

export const resolvers = {
  Query: {
    getNotes,
    getNoteById,
    getUserByEmail,
    currentUser,
  },
  Mutation: {
    addNote,
    updateNote,
    deleteNote,
    login,
    register,
  },
};
