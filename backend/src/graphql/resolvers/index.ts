import {
  updateNote,
  getNotes,
  addNote,
  getNoteById,
  deleteNote,
} from "./notes";
import { login, register } from "@/repositories/authRepository";
import { getUserByEmail, deleteUser, currentUser } from "./auth";

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
    deleteUser,
  },
};
