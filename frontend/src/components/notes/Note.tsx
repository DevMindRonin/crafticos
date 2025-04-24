"use client";
import React from "react";
import { NoteListProps } from "@/types/note.types";
import { useState } from "react";

const Note = ({ note, onDelete, onUpdate }: NoteListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(note.text);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(note.id, newText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewText(note.text);
    setIsEditing(false);
  };

  return isEditing ? (
    <form onSubmit={handleSubmit}>
      <>
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          autoFocus
        />
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Save</button>
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
