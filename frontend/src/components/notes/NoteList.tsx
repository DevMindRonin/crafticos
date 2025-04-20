"use client";
import React from "react";
import { NoteType } from "@/types/note.types";
import Note from "@/components/notes/Note";

type NoteListProps = {
  notes: NoteType[];
};

export const NoteList = ({ notes }: NoteListProps) => {
  return (
    <div>
      {notes && notes.map((note) => <Note key={note.id} note={note} />)}
    </div>
  );
};
