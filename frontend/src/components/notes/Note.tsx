"use client";
import React from "react";
import { NoteType } from "@/types/note.types";
import { useState } from "react";
interface DetailNoteType {
  note: NoteType;
}

const Note = ({ note }: DetailNoteType) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(note.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={handleSubmit}>
      <>
        <input value={newText} onChange={(e) => setNewText(e.target.value)} />
        <button type="submit">Ukončit</button>
      </>
    </form>
  ) : (
    <div>
      {note.text}
      <button onClick={() => setIsEditing(true)}>Editovat</button>
    </div>
  );
};

export default Note;
