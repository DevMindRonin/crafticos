"use client";
import React from "react";
import { NoteListProps } from "@/types/note.types";
import { useState } from "react";

const Note = ({ note, onDelete }: NoteListProps) => {
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
      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default Note;
