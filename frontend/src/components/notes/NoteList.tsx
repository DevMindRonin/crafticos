"use client";
import React from "react";
import { NotesListProps } from "@/types/note.types";
import Note from "@/components/notes/Note";

export const NoteList = ({ notes, onDelete, onUpdate }: NotesListProps) => {
  return (
    <div>
      {notes &&
        notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
    </div>
  );
};
