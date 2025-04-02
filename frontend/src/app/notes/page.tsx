"use client";

import { useQuery } from "@apollo/client";
import { GET_NOTES } from "@/graphql/queries/getNotes";
import { Note } from "@/types/types";

const NotesPage = () => {
  const { data, loading, error } = useQuery(GET_NOTES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>LIST ÚKOLŮ</h1>
      {data.getNotes.map((note: Note) => (
        <div key={note.id}>{note.text}</div>
      ))}
    </div>
  );
};

export default NotesPage;
