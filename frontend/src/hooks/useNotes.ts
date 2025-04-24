import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTES, DELETE_NOTE, UPDATE_NOTE, ADD_NOTE } from "@/graphql/notes";
import {
  NoteQueryResult,
  DeleteMutationResult,
  UpdateMutationResult,
} from "@/types/graphql.types";
import { useState } from "react";
export const useNotes = () => {
  const { data, refetch } = useQuery<NoteQueryResult>(GET_NOTES);

  const [onDelete] = useMutation<DeleteMutationResult>(DELETE_NOTE);
  const [onUpdate] = useMutation<UpdateMutationResult>(UPDATE_NOTE);

  const [noteText, setNoteText] = useState<string>("");
  const [error, setError] = useState("");

  const onDeleteNote = async (id: string) => {
    try {
      await onDelete({
        variables: { id },
      });
      refetch();
    } catch (error) {
      console.error("Error during deleting note:", error);
      throw error;
    }
  };

  const onUpdateNote = async (id: string, text: string) => {
    try {
      await onUpdate({
        variables: {
          id,
          text,
        },
      });
    } catch (error) {
      console.error("Error during updaring note: ", error);
      throw error;
    }
  };

  const [inputNewNote] = useMutation(ADD_NOTE);

  const onSave = async () => {
    try {
      if (!noteText.trim()) {
        setError("Insert some value");
        return;
      }
      await inputNewNote({
        variables: {
          text: noteText,
        },
      });
      refetch();
      setNoteText("");
    } catch {
      setError("Problem with saving a note");
    }
  };

  return {
    onDeleteNote,
    onUpdateNote,
    notesToDisplay: data?.getNotes || [],

    noteText,
    setNoteText,
    onSave,
    error,
    setError,
  };
};
