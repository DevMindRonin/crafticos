"use client";

import { useState, useEffect } from "react";
import { graphqlRequest } from "@/utils/api";
import Link from "next/link";
import { Note } from "@/types/types";

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
      <h1 className="text-4xl font-bold my-4">LIST ÚKOLŮ</h1>
      {notes.map((note) => (
        <div key={note.id}>{note.text}</div>
      ))}
      <br />
      <Link href="/dashboard">Back</Link>
    </div>
  );
};

export default NotesPage;
