"use client";

import { useQuery } from "@apollo/client";
import { GET_NOTES } from "@/graphql/queries/getNotes";
import { NoteType } from "@/types/note.types";

const NotesPage = () => {
  const { data, loading } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>LIST ÚKOLŮ</h1>
      {data.getNotes.map((note: NoteType) => (
        <div key={note.id}>{note.text}</div>
      ))}
    </div>
  );
};

export default NotesPage;
