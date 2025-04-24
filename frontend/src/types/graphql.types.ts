import { NoteType } from "@/types/note.types";

export interface DeleteMutationResult {
  deleteNote: NoteType;
}

export interface NoteQueryResult {
  getNotes: NoteType[];
}

export interface UpdateMutationResult {
  id: string;
  updateNote: NoteType;
}
