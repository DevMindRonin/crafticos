"use client";
import { NoteList } from "@/components/notes/NoteList";
import { NoteForm } from "@/components/notes/NoteForm";
import { useNotes } from "@/hooks/useNotes";

const NotesPage = () => {
  const {
    notesToDisplay,
    onDeleteNote,
    onUpdateNote,
    noteText,
    setNoteText,
    onSave,
    error,
    setError,
  } = useNotes();

  return (
    <div className="px-[150px] py-4">
      <h1 className="text-2xl font-bold mb-4">List of notes</h1>
      <NoteList
        notes={notesToDisplay}
        onDelete={onDeleteNote}
        onUpdate={onUpdateNote}
      />
      <NoteForm
        noteText={noteText}
        setNoteText={setNoteText}
        onSave={onSave}
        error={error}
        setError={setError}
      />
    </div>
  );
};

export default NotesPage;
