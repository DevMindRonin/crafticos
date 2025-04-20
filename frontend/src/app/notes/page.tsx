"use client";

import { NoteList } from "@/components/notes/NoteList";
import { useNotes } from "@/hooks/useNotes";

const NotesPage = () => {
  const { notesToDisplay, loading } = useNotes();
  if (loading) return <div>Načítání...</div>;

  return (
    <div className="px-[150px] py-4">
      <h1 className="text-2xl font-bold mb-4">NOTES</h1>
      <NoteList notes={notesToDisplay} />
    </div>
  );
};

export default NotesPage;
