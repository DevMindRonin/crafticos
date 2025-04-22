export type NoteType = {
  id: string;
  text: string;
  created_at?: string;
};

export type NoteListProps = {
  note: NoteType;
  onDelete: (id: string) => void;
};

export type NotesListProps = {
  notes: NoteType[];
  onDelete: (id: string) => void;
};
