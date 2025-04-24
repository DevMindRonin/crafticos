"use client";
interface InputNoteResult {
  noteText: string;
  setNoteText: (text: string) => void;
  onSave: () => void;
  error: string;
  setError: (message: string) => void;
}

export const NoteForm = ({
  noteText,
  setNoteText,
  onSave,
  error,
  setError,
}: InputNoteResult) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <input
          type="text"
          placeholder="Input text"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onFocus={() => setError("")}
        />
        <button type="submit">Insert a note</button>
      </form>
      {<p>{error}</p>}
    </div>
  );
};
