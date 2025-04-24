import { NoteType } from "@/types/note.types";

export interface DeleteMutationResult {
  id: string;
  deleteNote: boolean;
}

export interface NoteQueryResult {
  getNotes: NoteType[];
}

export interface UpdateMutationResult {
  id: string;
  updateNote: NoteType;
}
