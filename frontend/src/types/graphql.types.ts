import { NoteType } from "@/types/note.types";

export interface DeleteMutationResult {
  deleteNote: boolean;
  id: string;
}

export interface NoteQueryResult {
  getNotes: NoteType[];
}
