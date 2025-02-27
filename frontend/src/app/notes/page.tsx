// frontend/src/app/notes/page.tsx (příklad v Next.js 13 App Router)
"use client";

import { useState, useEffect } from "react";
import { graphqlRequest } from "../../utils/api";

type Note = {
  id: number;
  text: string;
};

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const query = `
        query {
          getNotes {
            id
            text
          }
        }
      `;
      const result = await graphqlRequest(query);
      console.log("🔍 GraphQL full result:", result);
      setNotes(result.data.getNotes);
    };

    fetchNotes().catch(console.error);
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>{note.text}</div>
      ))}
    </div>
  );
};

export default NotesPage;
